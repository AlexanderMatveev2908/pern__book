import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { BookStoreUser } from "../../../models/all/BookStoreUser.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";

export const getAllStoresWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const bookStores = await BookStoreUser.findAll({
    where: {
      userID,
    },
    include: [
      {
        model: BookStore,
        as: "bookStore",
        include: [
          {
            model: ImgBookStore,
            as: "images",
          },
          {
            model: VideoBookStore,
            as: "video",
          },
        ],
      },
    ],
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  return res200(res, { msg: "✌🏼", nHits, bookStores });
};
