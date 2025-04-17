import { Response } from "express";
import { res200 } from "../../../lib/lib.js";
import { ReqApp } from "../../../types/types.js";
import { User } from "../../../models/models.js";

export const getUserProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  console.log(req.userID);

  return res200(res);
};
