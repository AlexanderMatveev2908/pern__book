import { Response } from "express";
import { res200 } from "../../lib/responseClient/res.js";
import { ReqApp } from "../../types/types.js";
import { BookStore } from "../../models/all/BookStore.js";
import { err404 } from "../../lib/responseClient/err.js";

export const getMyStore = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const bookStore = await BookStore.findOne({
    where: { ownerID: userID, id: bookStoreID },
  });
  if (!bookStore) return err404(res, { msg: "Bookstore not found" });

  return res200(res, { bookStore });
};
