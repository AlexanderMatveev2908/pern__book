import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import {
  err400,
  err401,
  err404,
  err500,
} from "../../lib/responseClient/err.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { setCookie } from "../../lib/hashEncryptSign/JWE.js";
import { res200 } from "../../lib/responseClient/res.js";
import { pairTokenSession } from "../../lib/combo/combo.js";
import { seq } from "../../config/db.js";
import { User } from "../../models/all/User.js";

export const choseNewPwdForgotOld = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, token, password: newPwd } = req.body;

  const user = await User.findByPk(userID);
  if (!user) return err404(res, "user not found");
  if (user.email === newPwd)
    return err400(res, { msg: "email must be different from password" });

  const isOldPwd = await verifyPwd(user.password, newPwd);
  if (isOldPwd)
    return err400(res, {
      msg: "new password must be different from old password",
    });

  const result = await checkCbcHmac({
    user,
    token,
    event: TokenEventType.FORGOT_PWD,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result) });

  const t = await seq.transaction();

  try {
    user.password = newPwd;
    await user.hashPwdUser(t);

    const { accessToken, refreshToken } = await pairTokenSession(user, t);

    await t.commit();

    setCookie(res, refreshToken);
    return res200(res, { msg: "new password saved", accessToken });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};
