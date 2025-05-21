import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { BookStoreUser } from "../../../models/all/BookStoreUser.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { Order } from "../../../models/all/Order.js";
import { Book } from "../../../models/all/Book.js";
import { Review } from "../../../models/all/Review.js";
import { queryStoresWorker } from "../../../lib/query/worker/bookStores/query.js";

export const getAllStoresWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const { queryStores } = queryStoresWorker(req);

  const bookStores = await BookStoreUser.findAll({
    where: {
      userID,
    },
    include: [
      {
        model: BookStore,
        as: "bookStore",
        where: queryStores,
        include: [
          {
            model: ImgBookStore,
            as: "images",
          },
          {
            model: VideoBookStore,
            as: "video",
          },
          {
            model: Order,
            as: "orders",
          },
          {
            model: Book,
            as: "books",
            include: [
              {
                model: Review,
                as: "reviews",
              },
            ],
          },
        ],
      },
    ],
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  return res200(res, { msg: "✌🏼", nHits, bookStores });
};
