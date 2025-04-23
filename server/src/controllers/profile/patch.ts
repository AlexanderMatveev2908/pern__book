import { Response } from "express";
import { ReqApp, TokenEventType } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { Thumb, ThumbInstance } from "../../models/all/Thumb.js";
import { uploadThumb } from "../../lib/cloud/uploadSingle.js";
import { Token, User, UserInstance } from "../../models/models.js";
import { delCloud } from "../../lib/cloud/delete.js";
import { err400, err500 } from "../../lib/responseClient/err.js";
import { isObjOk, parseNull } from "../../lib/validateDataStructure.js";
import { genTokenCBC } from "../../lib/hashEncryptSign/cbcHmac.js";
import { sendEmailAuth } from "../../lib/mail/auth.js";
import { __cg } from "../../lib/utils/log.js";

const clearThumb = async (user: UserInstance) => {
  await delCloud(user!.Thumb!.publicID);
  await user.Thumb!.destroy();
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

  try {
    for (const keyAd in address) {
      (user as any)[keyAd as keyof UserInstance] = parseNull(address[keyAd]);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    const isCloudUpload = isObjOk(thumbUploadNow);
    const isURL = parseNull(thumbURL);

    if (!isCloudUpload) {
      if (!isURL && user.Thumb?.publicID) await clearThumb(user);
    } else {
      if (user.Thumb?.publicID) await clearThumb(user);
      await Thumb.create({ ...thumbUploadNow, userID });
    }
  } catch (err) {
    console.log(err);

    if (thumbUploadNow?.publicID) await delCloud(thumbUploadNow.publicID);
    return err500(res, { msg: "error during update profile" });
  }

  return res200(res, { msg: "user profile updated" });
};

export const updateEmail = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { email } = req.body;

  const user = (await User.findByPk(userID)) as UserInstance;
  if (user!.email === email) return err400(res, { msg: "email is the same" });

  user!.tempEmail = email;
  await user!.save();

  try {
    await Token.destroy({
      where: { userID, event: TokenEventType.CHANGE_EMAIL },
    });
    const { verifyToken } =
      (await genTokenCBC({
        user,
        event: TokenEventType.CHANGE_EMAIL,
      })) ?? {};
    await sendEmailAuth({
      user,
      token: verifyToken!,
      event: TokenEventType.CHANGE_EMAIL,
      newEmail: user!.tempEmail as string,
    });

    return res200(res, { msg: "email almost updated" });
  } catch (err) {
    __cg("err email", err);

    user!.tempEmail = null;
    await user!.save();
    await Token.destroy({
      where: { userID, event: TokenEventType.CHANGE_EMAIL },
    });

    return err500(res, { msg: "error during update email" });
  }
};
