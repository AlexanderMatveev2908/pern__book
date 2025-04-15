import { Request, Response } from "express";
import { User } from "../../../models/models.js";
import { res200 } from "../../../lib/lib.js";
import { ReqApp } from "../../../types/types.js";

export const getInfoProfileHome = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { user } = req;

  const existingUser = await User.findByPk(user!.id, {
    attributes: { exclude: ["password"] },
  });

  return res200(res, { data: existingUser });
};
