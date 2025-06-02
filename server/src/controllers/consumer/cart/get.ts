import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";

export const getCart = async (req: ReqApp, res: Response) => {
  return res200(res, { msg: "✌🏽" });
};
