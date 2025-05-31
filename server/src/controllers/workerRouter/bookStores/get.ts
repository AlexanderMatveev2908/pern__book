import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
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
import { FindAttributeOptions, literal, Op } from "sequelize";
import { countTo_5 } from "../../../lib/utils/utils.js";
import { replacePoint } from "../../../lib/dataStructures.js";
import { Literal } from "sequelize/lib/utils";
import { OrderStage } from "../../../types/all/orders.js";
import { capChar } from "../../../lib/utils/formatters.js";
import { User } from "../../../models/models.js";
import { err403, err404 } from "../../../lib/responseClient/err.js";
import { sortItems } from "../../../lib/query/sort.js";
import { calcRatingSqlStores } from "../../../lib/query/general.js";

// ? I AM AWARE OF THE FACT THAT I REPEATED SAME SQL QUERY MANY TIMES, IN OTHERS FILES I MADE FUNCTIONS TO NOT DO IT, HERE THE QUERY TART BEING MORE NESTED SO MORE INTERESTING AND TO LEARN MORE ABOUT NESTED QUERIES REPEATING IT HELP ME MEMORIZE THE STRUCTURE

const myCoolNestedSql: FindAttributeOptions = {
  include: [
    [
      literal(`(
      SELECT COALESCE(COUNT(DISTINCT b.id), 0)
      FROM books AS b
      WHERE b."bookStoreID" = "BookStore"."id"
    )`),
      "booksCount",
    ],
    [
      literal(`(
    SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
    FROM books AS b
    WHERE b."bookStoreID" = "BookStore"."id"
  )`),
      "avgQty",
    ],
    [
      literal(`(
    SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
    FROM books AS b
    WHERE b."bookStoreID" = "BookStore"."id"
  )`),
      "avgPrice",
    ],
    ...calcRatingSqlStores(),

    [
      literal(`(
    SELECT COALESCE(COUNT(DISTINCT o.id), 0)
    FROM orders AS o
    WHERE o."bookStoreID" = "BookStore"."id"
  )`),
      "ordersCount",
    ],

    ...(Object.values(OrderStage).map((stage) => [
      literal(`(
    SELECT COALESCE(COUNT(DISTINCT o.id), 0)
    FROM orders AS o
    WHERE o."bookStoreID" = "BookStore"."id"
      AND o."stage" = '${stage}'
  )`),
      `orders${capChar(stage)}Count`,
    ]) as [Literal, string][]),
  ],
};

const myCollFlatSql: FindAttributeOptions = {
  include: [
    [
      literal(`(
          SELECT COALESCE(COUNT(DISTINCT b.id), 0)
          FROM books as b
          WHERE b."bookStoreID" = "BookStore"."id"
          )`),
      "booksCount",
    ],
    [
      literal(`(
            SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
            FROM books as b
            WHERE b."bookStoreID" = "BookStore"."id"
            )`),
      "avgQty",
    ],
    [
      literal(`(
            SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
            FROM books as b
            WHERE b."bookStoreID" = "BookStore"."id"
            )`),
      "avgPrice",
    ],
    [
      literal(`(
          SELECT COALESCE(COUNT(DISTINCT o.id), 0)
          FROM orders as o
          WHERE o."bookStoreID" = "BookStore"."id"
          )`),
      "ordersCount",
    ],
    ...calcRatingSqlStores(),

    ...(Object.values(OrderStage).map((stage) => [
      literal(
        `(
        SELECT COALESCE(COUNT(DISTINCT o.id), 0)
        FROM orders AS o
        WHERE o."bookStoreID" = "BookStore"."id"
        AND o."stage" = '${stage}'
        )`
      ),
      "orders" + capChar(stage) + "Count",
    ]) as [Literal, string][]),
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
    attributes: myCollFlatSql,
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
        model: Order,
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

  const bookStores = await BookStore.findAll({
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
      },
      {
        model: VideoBookStore,
        as: "video",
      },
      {
        model: Order,
        as: "orders",
        where: queryOrders,
        required: !!Object.keys(queryOrders).length,
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
    attributes: myCoolNestedSql,
    group: [
      "BookStore.id",
      "team.id",
      "team->bookStoreUser.id",
      "images.id",
      "video.id",
      "orders.id",
      "books.id",
      "books->reviews.id",
    ],
    having: queryAfterPipe,
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  const { sorted } = sortItems(req, bookStores);

  const { paginated, totPages } = calcPagination({
    req,
    nHits,
    els: sorted,
  });

  return res200(res, { msg: "✌🏼", nHits, bookStores: paginated, totPages });
};
