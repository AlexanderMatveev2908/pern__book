import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";

export const updateStoreManager = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, body } = req;
  const { bookStoreID } = req.params;
  const files = req.files as Express.Multer.File[];

  return res200(res, { msg: "bookstore updated" });
};
