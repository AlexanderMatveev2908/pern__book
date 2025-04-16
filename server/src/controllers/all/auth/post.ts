import { Request, Response } from "express";
import {
  calcTimeRun,
  capChar,
  genAccessJWT,
  err409,
  hashPwd,
  res201,
  sendEmailAuth,
  genTokenHMAC,
} from "../../../lib/lib.js";
import { TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";

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

  await sendEmailAuth({
    user: newUser,
    token: verifyToken,
    event: TokenEventType.VERIFY_ACCOUNT,
  });

  return res201(res, { msg: "Account created", accessToken });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  console.log(user);

  return res.status(200).json({ ok: true });
};
