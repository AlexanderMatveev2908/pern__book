import { Response } from "express";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { ReqApp } from "../../types/types.js";
import { err404 } from "../../lib/responseClient/err.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { getStoreByID } from "./helpers/storeData.js";
import { BookStore } from "../../models/all/BookStore.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { calcPagination } from "../../lib/query/pagination.js";
import { createStoreQ } from "../../lib/query/bookStore/query.js";

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

export const getAllStores = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const count = await BookStore.count({
    where: {
      ownerID: userID,
    },
  });
  if (!count) return res204(res);

  const { skip, totPages } = calcPagination(req, count);

  const query = createStoreQ(req);

  const bookStores = await BookStore.findAll({
    where: query,
    include: [
      {
        model: ImgBookStore,
        as: "images",
      },
    ],
  });

  return res200(res, { msg: "all good", bookStores });
};
