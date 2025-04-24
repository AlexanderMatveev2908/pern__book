import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import { User } from "../../models/models.js";
import {
  err401,
  err404,
  err409,
  err500,
} from "../../lib/responseClient/err.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { res200 } from "../../lib/responseClient/res.js";
import { genAccessJWT } from "../../lib/hashEncryptSign/JWT.js";
import { genTokenJWE, setCookie } from "../../lib/hashEncryptSign/JWE.js";

export const verifyEmailForgotPwd = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, event, token } = req.body;

  const user = await User.findOne({ where: { id: userID } });
  if (!user) return err404(res, { msg: "user not found" });

  const result = await checkCbcHmac({
    user,
    token,
    event,
    del: false,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result as string) });

  return res200(res, { msg: "email verified" });
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

  const oldEmails = {
    tempEmail: user.tempEmail,
    email: user.email,
    isVerified: user.isVerified,
  };

  await user.verifyNewEmail();

  try {
    const accessToken = genAccessJWT(user);
    const refreshToken = await genTokenJWE(user);

    setCookie(res, refreshToken);

    return res200(res, { msg: "new email verified", accessToken });
  } catch (err: any) {
    user.email = oldEmails.email;
    user.tempEmail = oldEmails.tempEmail;
    user.isVerified = oldEmails.isVerified;
    await user.save();

    return err500(res, { msg: "error during verification email" });
  }
};
