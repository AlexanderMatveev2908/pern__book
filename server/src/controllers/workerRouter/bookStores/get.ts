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
import { calcPagination } from "../../../lib/query/pagination.js";
import { literal } from "sequelize";
import { countTo_5 } from "../../../lib/utils/utils.js";
import { replacePoint } from "../../../lib/dataStructures.js";
import { Literal } from "sequelize/lib/utils";

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
        // ? actually is implicit fact it is required cause have a junction with no models related is not possible cause  sever would crash trying to delete an item not respecting sql priority of constraints
        // required: true,
        attributes: {
          include: [
            [
              literal(`(
            SELECT COALESCE(COUNT(DISTINCT b.id),0)
            FROM "book_stores" as bs
            INNER JOIN "books" as b ON bs.id = b."bookStoreID"
            WHERE bs."id" = "BookStoreUser"."bookStoreID"
            )`),
              "booksCount",
            ],
            [
              literal(`(
                SELECT ROUND(COALESCE(AVG(b.qty),0),0)
                FROM "book_stores" as bs
                INNER JOIN "books" as b ON bs.id = b."bookStoreID"
                WHERE bs."id" = "BookStoreUser"."bookStoreID"
                )`),
              "avgQty",
            ],
            [
              literal(`(
                SELECT ROUND(COALESCE(AVG( b.price)),2)
                FROM "book_stores" as bs
                INNER JOIN "books" as b ON bs.id = b."bookStoreID"
                WHERE bs."id" = "BookStoreUser"."bookStoreID"
                )`),
              "avgPrice",
            ],
            [
              literal(`(
                SELECT COALESCE(COUNT(DISTINCT r.id),0)
                FROM "book_stores" as bs
                INNER JOIN "books" as b ON bs.id = b."bookStoreID"
                INNER JOIN "reviews" as r ON b.id = r."bookID"
                WHERE bs."id" = "BookStoreUser"."bookStoreID"
                )`),
              "reviewsCount",
            ],
            [
              literal(`(
              SELECT ROUND(COALESCE(AVG(r.rating),0),1)
              FROM "book_stores" as bs
              INNER JOIN "books" as b ON bs.id = b."bookStoreID"
              INNER JOIN "reviews" as r ON b.id = r."bookID"
              WHERE bs."id" = "BookStoreUser"."bookStoreID"
              )`),
              "avgRating",
            ],

            ...(countTo_5().map((pair) => [
              literal(`(
                SELECT ROUND(COALESCE(AVG(r.rating),0),1)
                FROM "book_stores" as bs
                INNER JOIN "books" as b ON bs.id = b."bookStoreID"
                INNER JOIN "reviews" as r ON b.id = r."bookID"
                WHERE bs."id" = "BookStoreUser"."bookStoreID"
                AND r.rating BETWEEN ${pair[0]} AND ${pair[1]}
              )`),
              `reviews__${replacePoint(pair[0])}__${replacePoint(pair[1])}`,
            ]) as [Literal, string][]),
          ],
        },
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
    group: [
      "BookStoreUser.id",
      "bookStore.id",
      "bookStore->images.id",
      "bookStore->video.id",
      "bookStore->orders.id",
      "bookStore->books.id",
      "bookStore->books->reviews.id",
    ],
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  const { paginated, totPages } = calcPagination({
    req,
    nHits,
    els: bookStores,
  });

  return res200(res, { msg: "✌🏼", nHits, bookStores: paginated, totPages });
};
