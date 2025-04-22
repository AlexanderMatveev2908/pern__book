import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/res.js";

export const updateProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { firstName, lastName, ...address } = req.body;

  console.log(firstName, lastName);
  console.log(req.file);
  console.log(address);

  return res200(res, { msg: "stuff" });
};
