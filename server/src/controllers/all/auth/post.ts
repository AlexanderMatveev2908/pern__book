import { Request, Response } from "express";
import {
  genAccessJWT,
  err409,
  res201,
  sendEmailAuth,
  genTokenHMAC,
  genTokenJWE,
  setCookie,
} from "../../../lib/lib.js";
import { TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";
import { isDev } from "../../../config/env.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = User.build(req.body);

  if (await newUser.existUser())
    return err409(res, { msg: "User already exists" });

  newUser.capitalize();
  await newUser.hashPwdUser();
  await newUser.save();

  const accessToken = genAccessJWT(newUser);

  const { verifyToken } = await genTokenHMAC({
    user: newUser,
    event: TokenEventType.VERIFY_ACCOUNT,
  });
  const refreshToken = await genTokenJWE(newUser);

  await sendEmailAuth({
    user: newUser,
    token: verifyToken,
    event: TokenEventType.VERIFY_ACCOUNT,
  });

  setCookie(res, refreshToken);

  return res201(res, { msg: "Account created", accessToken });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  console.log(user);

  return res.status(200).json({ ok: true });
};
