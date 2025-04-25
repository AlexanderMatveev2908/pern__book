import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import { User } from "../../models/models.js";
import { res200 } from "../../lib/responseClient/res.js";
import {
  err401,
  err404,
  err409,
  err500,
} from "../../lib/responseClient/err.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { setCookie } from "../../lib/hashEncryptSign/JWE.js";
import { pairTokenSession } from "../../lib/taughtStuff/combo.js";
import { clearTokensById } from "../../lib/clearData.js";
import { seq } from "../../config/db.js";

export const verifyAccount = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { token, userID, event } = req.body;

  const user = await User.findByPk(userID, {
    include: {
      all: true,
    },
  });
  if (!user) return err404(res, { msg: "user not found" });
  if (user.isVerified) return err409(res, { msg: "user already verified" });

  const result = await checkCbcHmac({
    user,
    token,
    event,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result as string) });

  const t = await seq.transaction();

  try {
    await user.verify(t);

    await clearTokensById(user.id, [TokenEventType.CHANGE_EMAIL]);

    const { accessToken, refreshToken } = await pairTokenSession(user, t);

    await t.commit();

    setCookie(res, refreshToken);

    return res200(res, { msg: "account verified", accessToken });
  } catch (err: any) {
    await t.rollback();
    return err500(res, { msg: "error verifying user email" });
  }
};

export const verifyNewEmail = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, token, event } = req.body;

  const user = await User.findByPk(userID);
  if (!user) return err404(res, { msg: "user not found" });
  if (!user.tempEmail)
    return err409(res, { msg: "there is no email to verify" });

  const result = await checkCbcHmac({
    user,
    event,
    token,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result) });

  const t = await seq.transaction();

  try {
    await user.verifyNewEmail(t);

    const { accessToken, refreshToken } = await pairTokenSession(user, t);

    await t.commit();

    setCookie(res, refreshToken);

    return res200(res, { msg: "new email verified", accessToken });
  } catch (err: any) {
    await t.rollback();

    return err500(res, { msg: "error during verification email" });
  }
};
