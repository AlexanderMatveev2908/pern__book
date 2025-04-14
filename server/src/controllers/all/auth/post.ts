import { Request, Response } from "express";
import { err400, err401, err409, res200, res201 } from "../../../lib/lib.js";
import { Token, User } from "../../../models/models.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = req.body;

  await Token.count({ where: {} });
  const existingUser = await User.findOne({
    where: { email: newUser.email },
  });
  console.log(User.associations);
  console.log(Token.associations);

  // if (existingUser) return err409(res);

  // return res.status(400).end();
  return res200(res, { msg: "Registered" });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  console.log(user);

  return res.status(200).json({ ok: true });
};
