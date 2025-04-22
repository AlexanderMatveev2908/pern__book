import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/res.js";

export const updateProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  console.log(req.files);
  console.log(req.body);

  return res200(res, {});
};
