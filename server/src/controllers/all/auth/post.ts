import { Request, Response } from "express";
import {
  genAccessJWT,
  err409,
  res201,
  sendEmailAuth,
  genTokenJWE,
  setCookie,
  genTokenCBC,
} from "../../../lib/lib.js";
import { TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";

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
    const { verifyToken } = await genTokenCBC({
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
  } catch (err: any) {
    if (userID) await User.destroy({ where: { id: userID } });

    throw err;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  return res.status(200).json({ ok: true });
};
