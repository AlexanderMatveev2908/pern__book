import { Response } from "express";
import { res200 } from "../../lib/responseClient/res.js";
import { ReqApp } from "../../types/types.js";
import { err404 } from "../../lib/responseClient/err.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { getStoreByID } from "./helpers/storeData.js";

export const getMyStore = async (req: ReqApp, res: Response): Promise<any> => {
  const bookStore = await getStoreByID(req);

  if (!bookStore) return err404(res, { msg: "Bookstore not found" });

  const team = await BookStoreUser.findAll({
    where: { bookStoreID: bookStore.id },
  });

  const bookStoreObj = {
    ...bookStore.toJSON(),
    team,
  };

  return res200(res, { bookStore: bookStoreObj });
};
