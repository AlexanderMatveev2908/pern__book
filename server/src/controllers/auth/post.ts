import { Request, Response } from "express";
import { ReqApp, TokenEventType } from "../../types/types.js";
import { User } from "../../models/models.js";
import {
  err401,
  err404,
  err409,
  err500,
} from "../../lib/responseClient/err.js";
import { prepareHeader } from "../../lib/hashEncryptSign/JWT.js";
import { clearCookie, setCookie } from "../../lib/hashEncryptSign/JWE.js";
import { res200, res201 } from "../../lib/responseClient/res.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { clearTokensByExpired, clearTokensById } from "../../lib/clearData.js";
import {
  genTokSendEmail,
  pairTokenSession,
} from "../../lib/taughtStuff/combo.js";
import { seq } from "../../config/db.js";
import { __cg } from "../../lib/utils/log.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = User.build(req.body);

  if (await newUser.existUser())
    return err409(res, { msg: "User already exists" });

  const t = await seq.transaction();

  try {
    newUser.capitalize();
    await newUser.hashPwdUser(t);

    const { accessToken, refreshToken } = await pairTokenSession(newUser, t);

    await t.commit();

    await genTokSendEmail({
      user: newUser,
      event: TokenEventType.VERIFY_ACCOUNT,
    });

    setCookie(res, refreshToken);

    return res201(res, { msg: "Account created", accessToken });
  } catch (err: any) {
    __cg("register err", err);

    await t.rollback();
    return err500(res, { msg: "error creating account" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return err404(res, { msg: "user not found" });

  const match = await verifyPwd(user.password, password);
  if (!match) return err401(res, { msg: "invalid credentials" });

  const { accessToken, refreshToken } = await pairTokenSession(user);

  setCookie(res, refreshToken);

  return res.status(200).json({ msg: "login successful", accessToken });
};

export const logoutUser = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const accessExp = prepareHeader(req);

  clearCookie(res);

  const user = await User.findByPk(userID ?? "");

  if (!userID || !user) {
    if (accessExp) await clearTokensByExpired(accessExp);

    return res200(res, { msg: "logout successful" });
  }

  await clearTokensById(user.id, [
    TokenEventType.VERIFY_ACCOUNT,
    TokenEventType.CHANGE_EMAIL,
  ]);

  return res200(res, { msg: "logout successful" });
};
