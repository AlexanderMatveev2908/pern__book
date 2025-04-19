import { Request, Response } from "express";
import {
  genAccessJWT,
  err409,
  res201,
  sendEmailAuth,
  genTokenJWE,
  setCookie,
  genTokenCBC,
  res200,
  clearCookie,
  err404,
  verifyPwd,
  err401,
  prepareHeader,
  clearOldTokens,
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
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return err404(res, { msg: "user not found" });

  const match = await verifyPwd(user.password, password);
  if (!match) return err401(res, { msg: "invalid credentials" });

  const accessToken = genAccessJWT(user);
  const refreshToken = await genTokenJWE(user);

  setCookie(res, refreshToken);

  return res.status(200).json({ msg: "login successful", accessToken });
};

export const logoutUser = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const accessExp = prepareHeader(req);

  clearCookie(res);

  const user = await User.findByPk(userID ?? "");

  if (!userID || !user) {
    if (accessExp) await clearOldTokens(accessExp);

    return res200(res, { msg: "logout successful" });
  }

  await Token.destroy({ where: { userID: user.id } });
  return res200(res, { msg: "logout successful" });
};
