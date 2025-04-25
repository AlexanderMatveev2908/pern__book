import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { Thumb, ThumbInstance } from "../../models/all/Thumb.js";
import { uploadThumb } from "../../lib/cloud/uploadSingle.js";
import { User, UserInstance } from "../../models/models.js";
import { delCloud } from "../../lib/cloud/delete.js";
import {
  err400,
  err401,
  err409,
  err500,
} from "../../lib/responseClient/err.js";
import { isObjOk, parseNull } from "../../lib/validateDataStructure.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { __cg } from "../../lib/utils/log.js";
import { genTokSendEmail } from "../../lib/combo/combo.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { seq } from "../../config/db.js";
import { Transaction } from "sequelize";

const delOldThumb = async (user: UserInstance, t: Transaction) => {
  await delCloud(user!.Thumb!.publicID);
  await user.Thumb!.destroy({ transaction: t });
};

export const updateProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { firstName, lastName, thumb: thumbURL, ...address } = req.body;

  const user = (await User.findByPk(userID, {
    include: [
      {
        model: Thumb,
      },
    ],
    nest: true,
  })) as UserInstance;

  let thumbUploadNow: Partial<ThumbInstance> | null = null;
  if (req.file) thumbUploadNow = await uploadThumb(req.file);

  const t = await seq.transaction();

  try {
    for (const keyAd in address) {
      (user as any)[keyAd as keyof UserInstance] = parseNull(address[keyAd]);
    }
    // this time i already capitalize them on client side
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save({ transaction: t });

    const isCloudUpload = isObjOk(thumbUploadNow);
    const isURL = parseNull(thumbURL);

    if (isCloudUpload)
      await Thumb.create(
        {
          ...thumbUploadNow,
          userID,
        },
        { transaction: t }
      );

    if ((!isURL || isCloudUpload) && user.Thumb?.publicID)
      await delOldThumb(user, t);

    await t.commit();

    return res200(res, { msg: "user profile updated" });
  } catch (err) {
    if (thumbUploadNow?.publicID) await delCloud(thumbUploadNow.publicID);
    await t.rollback();

    return err500(res);
  }
};

export const updateEmail = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { email, token } = req.body;

  const existUser = await User.findOne({
    where: {
      email,
    },
  });
  if (existUser)
    return err409(res, { msg: "already exist a user with this email" });
  const user = (await User.findByPk(userID)) as UserInstance;
  if (user!.email === email) return err400(res, { msg: "email is the same" });

  const result = await checkCbcHmac({
    user,
    token,
    event: TokenEventType.SECURITY,
    del: false,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result) });

  const t = await seq.transaction();

  try {
    user!.tempEmail = email;
    await user!.save({ transaction: t });

    await t.commit();

    await genTokSendEmail({
      user,
      event: TokenEventType.CHANGE_EMAIL,
      newEmail: user!.tempEmail as string,
    });

    return res200(res, { msg: "email almost updated" });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};

export const updatePwd = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { token, password: newPwd } = req.body;

  const user = (await User.findByPk(userID)) as UserInstance;

  const match = await checkCbcHmac({
    user,
    token,
    event: TokenEventType.SECURITY,
    del: false,
  });
  if (match !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(match) });

  if (user.email === newPwd)
    return err400(res, { msg: "password should be different from email" });
  const isSamePwd = await verifyPwd(user.password, newPwd);
  if (isSamePwd)
    return err400(res, { msg: "new pwd should be different from old one" });

  const t = await seq.transaction();

  try {
    user.password = newPwd;
    await user.hashPwdUser(t);

    // await Token.destroy({
    //   where: {
    //     userID: user.id,
    //     event: TokenEventType.SECURITY,
    //   },
    // });

    await t.commit();

    return res200(res, { msg: "password saved" });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};
