import { Request, Response } from "express";
import {
  genAccessJWT,
  err409,
  res201,
  sendEmailAuth,
  genTokenJWE,
  setCookie,
  genTokenCBC,
  err500,
  res200,
  clearCookie,
} from "../../../lib/lib.js";
import { ReqApp, TokenEventType } from "../../../types/types.js";
import { Token, User } from "../../../models/models.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = User.build(req.body);

  let userID: string | null = null;

  if (await newUser.existUser())
    return err409(res, { msg: "User already exists" });

  newUser.capitalize();
  await newUser.hashPwdUser();
  await newUser.save();
  userID = newUser.id;

  try {
    const accessToken = genAccessJWT(newUser);
    const tokenData = await genTokenCBC({
      user: newUser,
      event: TokenEventType.VERIFY_ACCOUNT,
    });

    const refreshToken = await genTokenJWE(newUser);

    await sendEmailAuth({
      user: newUser,
      token: tokenData!.verifyToken,
      event: TokenEventType.VERIFY_ACCOUNT,
    });

    setCookie(res, refreshToken);

    return res201(res, { msg: "Account created", accessToken });
  } catch (err: any) {
    if (userID) await User.destroy({ where: { id: userID } });

    throw err;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  return res.status(200).json({ ok: true });
};

export const logoutUser = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;

  const user = await User.findByPk(userID ?? "");
  if (!user) return res200(res, { msg: "logout successful" });

  await Token.destroy({ where: { userID } });
  clearCookie(res);
  return res200(res, { msg: "logout successful" });
};
