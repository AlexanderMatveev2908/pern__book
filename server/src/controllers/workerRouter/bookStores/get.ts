import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { Book } from "../../../models/all/Book.js";
import { Review } from "../../../models/all/Review.js";
import { queryStoresWorker } from "../../../lib/query/worker/bookStores.js";
import { FindAttributeOptions, literal, Op, OrderItem } from "sequelize";
import { err404 } from "../../../lib/responseClient/err.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { User } from "../../../models/all/User.js";
import {
  calcRatingSqlStores,
  countOrdersStores,
  countStatsBooksFoStore,
} from "../../../lib/query/general/bookstores.js";
import { sortAndPaginate } from "../../../lib/query/general/sortAndPaginate.js";
import { extractNoHits, extractOffset } from "../../../lib/utils/formatters.js";
import {
  sortByTimeStamps,
  wrapRawSort,
} from "../../../lib/query/general/sort.js";

// ? I AM AWARE OF THE FACT THAT I REPEATED SAME SQL QUERY MANY TIMES, IN OTHERS FILES I MADE FUNCTIONS TO NOT DO IT, HERE THE QUERY TART BEING MORE NESTED SO MORE INTERESTING AND TO LEARN MORE ABOUT NESTED QUERIES REPEATING IT HELP ME MEMORIZE THE STRUCTURE

const myCoolNestedSql: FindAttributeOptions = {
  include: [
    ...countStatsBooksFoStore(),
    ...calcRatingSqlStores(),
    ...countOrdersStores(),
  ],
};

export const getBookStoreWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;
  const { roles = "" } = req.query ?? {};

  const bookStore = await BookStore.findOne({
    where: {
      id: bookStoreID,
    },
    attributes: myCoolNestedSql,
    include: [
      {
        model: User,
        as: "team",
        required: true,
        attributes: ["id"],
        through: {
          where: {
            userID,
            role: {
              [Op.or]: (roles as string).split(",") as string[],
            },
          },
          as: "bookStoreUser",
          attributes: ["id", "role"],
        },
      },
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: VideoBookStore,
        as: "video",
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
      {
        model: OrderStore,
        as: "orders",
      },
    ],
  });

  if (!bookStore) return err404(res, { msg: "book store not found" });

  return res200(res, { bookStore });
};

export const getAllStoresWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const { queryStores, queryAfterPipe, queryOrders } = queryStoresWorker(req);

  const { rows: bookStores, count } = await BookStore.findAndCountAll({
    where: queryStores,
    include: [
      {
        model: User,
        as: "team",
        attributes: ["id"],
        required: true,
        through: {
          where: {
            userID,
          },
          as: "bookStoreUser",
          attributes: ["id", "role"],
        },
      },
      {
        model: ImgBookStore,
        as: "images",
        separate: true,
      },
      {
        model: VideoBookStore,
        as: "video",
      },
      {
        model: OrderStore,
        as: "orders",
        separate: true,
        where: queryOrders,
        required: !!Object.keys(queryOrders).length,
      },
      {
        model: Book,
        as: "books",
        separate: true,
        include: [
          {
            model: Review,
            as: "reviews",
          },
        ],
      },
    ],
    attributes: myCoolNestedSql,
    group: ["BookStore.id"],
    having: queryAfterPipe,

    ...extractOffset(req),

    ...((req.query?.avgPriceSort
      ? [
          [
            literal(`(
        SELECT COALESCE(AVG(b.price), 0)
        FROM "books" AS b
        INNER JOIN "reviews" AS r ON b.id = r."bookID"
        WHERE b."bookStoreID" = "BookStore"."id"
        AND b."deletedAt" IS NULL
        AND r."deletedAt" IS NULL
        )`),
            req.query.avgPriceSort,
          ],
        ]
      : []) as OrderItem[]),

    order: [
      ...sortByTimeStamps(req),

      ...(wrapRawSort(
        req,
        "avgPriceSort"
      )(
        `(
        SELECT COALESCE(AVG(b.price), 0)
        FROM "books" AS b
        WHERE b."bookStoreID" = "BookStore"."id"
        AND b."deletedAt" IS NULL
        )`
      ) as OrderItem[]),

      ...wrapRawSort(
        req,
        "avgQtySort"
      )(`(
        SELECT COALESCE(AVG(b.qty), 0)
        FROM "books" AS b
        WHERE b."bookStoreID" = "BookStore"."id"
        AND b."deletedAt" IS NULL
        )`),
    ],
  });

  const { nHits, totPages } = extractNoHits(req, count);

  return res200(res, { msg: "✌🏼", nHits, bookStores, totPages });
};
