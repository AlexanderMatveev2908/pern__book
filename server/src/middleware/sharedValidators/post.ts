import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res201 } from "../../lib/responseClient/res.js";

export const addBookWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  return res201(res, { msg: "Book created" });
};
