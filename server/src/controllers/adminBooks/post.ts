import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";

export const createBook = async (req: ReqApp, res: Response): Promise<any> => {
  console.log(req.body);

  return res200(res, { msg: "✌🏼" });
};
