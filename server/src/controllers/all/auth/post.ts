import { Request, Response } from "express";
import { err401, ErrAppMsgCode } from "../../../lib/all/err.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = req.body;

  console.log(newUser);

  // return res.status(400).end();
  return err401(res, ErrAppMsgCode.ACCESS_EXPIRED);
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  console.log(user);

  return res.status(200).json({ ok: true });
};
