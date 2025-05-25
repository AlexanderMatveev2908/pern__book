import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";

export const deleteBookWorker = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { bookID } = req.params;

  return res200(res, { msg: "book deleted" });
};
