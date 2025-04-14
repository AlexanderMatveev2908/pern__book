import { Request, Response } from "express";
import { err401, ErrAppMsgCode, res200, res201 } from "../../../lib/lib.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = req.body;

  console.log(newUser);

  // return res.status(400).end();
  return res201(res, { msg: "Registered" });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  console.log(user);

  return res.status(200).json({ ok: true });
};
