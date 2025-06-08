import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";

export const getAddressCheckout = async (req: ReqApp, res: Response) => {
  return res200(res, { msg: "ok" });
};
