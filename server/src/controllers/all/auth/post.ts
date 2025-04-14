import { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = req.body;

  console.log(newUser);

  return res.status(400).json({ ok: true, msg: "User already exist" });
};
