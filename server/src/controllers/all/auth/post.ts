import { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = req.body;

  console.log(newUser);

  // return res.status(400).end();
  return res.status(200).json({ ok: true, msg: "User registered" });
};
