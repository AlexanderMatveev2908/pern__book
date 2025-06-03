import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { tErr } from "../../../stuff/quick.js";

export const patchCartByClick = async (req: ReqApp, res: Response) => {
  return res200(res, {});
};
