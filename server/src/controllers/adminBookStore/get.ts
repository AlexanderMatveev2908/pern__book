import { Response } from "express";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { ReqApp, UserRole } from "../../types/types.js";
import { err404 } from "../../lib/responseClient/err.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { getStoreByID } from "./helpers/storeData.js";
import { BookStore } from "../../models/all/BookStore.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { calcPagination } from "../../lib/query/pagination.js";
import { createStoreQ } from "../../lib/query/bookStore/query.js";
import { Order } from "../../models/all/Order.js";
import { Review } from "../../models/all/Review.js";
import { Book } from "../../models/all/Book.js";
import { User } from "../../models/models.js";
import { col, fn, literal } from "sequelize";
import { Fn, Literal } from "sequelize/lib/utils";
import { OrderStage } from "../../types/all/orders.js";
import { capChar } from "../../lib/utils/formatters.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";

const calcAvgSeq = (
  prop: string,
  res: string,
  round: number = 2
): [Literal, string] => [
  literal(`ROUND(COALESCE(AVG(${prop}), 0), ${round})`),
  res,
];

const countWorkSql = (role: UserRole, res: string): [Literal, string] => [
  literal(`(
    SELECT COALESCE(
      COUNT(DISTINCT "book_stores_users"."userID"), 0
    )
    FROM "book_stores_users"
    WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
      AND "book_stores_users"."role" = '${role}'
  )`),
  res,
];

const countRevSql = (pair: number[]): [Literal, string] => [
  literal(`(
    SELECT COALESCE(COUNT(DISTINCT "reviews"."id"), 0)
    FROM "reviews"
    WHERE "reviews"."rating" BETWEEN ${pair[0]} AND ${pair[1]} 
    AND "reviews"."bookStoreID" = "BookStore"."id"
   )`),
  `reviews__${(pair[0] + "").replace(".", "_")}__${(pair[1] + "").replace(
    ".",
    "_"
  )}`,
];

const countOrdersSql = (stage: OrderStage, res: string): [Literal, string] => [
  literal(`(SELECT COALESCE(COUNT(DISTINCT "orders"."id"), 0)
    FROM "orders" 
    WHERE "orders"."stage" = '${stage}'
    AND "orders"."bookStoreID" = "BookStore"."id"
    )`),
  res,
];

const countItems = (name: string): [Literal, string] => [
  literal(`COALESCE(COUNT(DISTINCT ${name}.id), 0)`),
  `${name + "Count"}`,
];

const myCoolSql = [
  countItems("books"),
  countItems("orders"),
  countItems("reviews"),
  calcAvgSeq("reviews.rating", "avgRating"),
  ...[
    [0, 1],
    [1.1, 2],
    [2.1, 3],
    [3.1, 4],
    [4.1, 5],
  ].map((el, i) => countRevSql(el)),
  calcAvgSeq("books.price", "avgPrice"),
  calcAvgSeq("books.qty", "avgQty", 0),
  ...Object.values(OrderStage).map((el) =>
    countOrdersSql(el, "orders" + capChar(el) + capChar("count"))
  ),
  [
    literal(`(
      SELECT COALESCE(COUNT(DISTINCT "book_stores_users"."id"), 0)
      FROM "book_stores_users"
      WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
    )`),
    "teamCount",
  ],
  countWorkSql(UserRole.MANAGER, "managersCount"),
  countWorkSql(UserRole.EMPLOYEE, "employeesCount"),
];

export const getMyStore = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const bookStore = await BookStore.findOne({
    where: {
      ownerID: userID,
      id: bookStoreID,
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
        model: Review,
        as: "reviews",
      },
      {
        model: Book,
        as: "books",
      },
      {
        model: User,
        as: "team",
      },
    ],
    group: [
      "BookStore.id",
      "images.id",
      "video.id",
      "orders.id",
      "reviews.id",
      "books.id",
      "team.id",
      "team->BookStoreUser.id",
    ],
    attributes: {
      include: myCoolSql as [[Literal, string]],
    },
  });

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

  const { queryStore, queryOrders, queryAfterPipe } = createStoreQ(req);

  const bookStores = await BookStore.findAll({
    where: queryStore,
    include: [
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: Order,
        as: "orders",
        where: queryOrders,
        // ? WITHOUT REQUIRED IT WOULD BE A LEFT JOIN WHERE WE GET ALL DATA EVEN INNER MODELS DOES NOT MATCH OPT, WITH REQUIRED IT IS AN INNER JOIN AND INNER DATA MUST MATCH AND RESPECT PARAMS PROVIDED
        required: !!Object.keys(queryOrders).length,
      },
      {
        model: Review,
        as: "reviews",
        attributes: ["rating", "bookStoreID", "id"],
      },
      {
        model: Book,
        as: "books",
        attributes: ["id", "qty", "price"],
      },
      {
        model: User,
        as: "team",
        attributes: ["firstName", "lastName"],
        // through: {
        // attributes: ["id", "role", "bookStoreID", "userID"],
        // },
        where: {},
        required: false,
      },
    ],
    // ? ADDING CUSTOM FIELDS IS LIKE USING $LOOKUP, THEN $UNWIND, THEN $SET( OR $ADD_FIELDS ON OLDER VERSIONS) WITH MONGOOSE(ODM OF MONGO_DB) FOR NO_SQL_LANGUAGE, AT THE END ITEMS TAKEN EACH ONE IN ITS OWN AS OBJ WITH ALL PROPS OF PARENT NEEDS TO BE GROUPED AGAIN AS ITEM OF A LIST(ITEM OF ARRAY AS ELEMENT), TO DO THAT WE NEED GROUP
    attributes: {
      include: myCoolSql,
    } as any,
    group: [
      "BookStore.id",
      "images.id",
      "orders.id",
      "reviews.id",
      "books.id",
      "team.id",
      "team->BookStoreUser.id",
    ],
    having: queryAfterPipe,
    // limit: 1,
    // offset: 1,
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  const { skip, limit, totPages } = calcPagination(req, nHits);
  const paginated = bookStores.slice(skip, +skip! + +limit!);

  return res200(res, { bookStores: paginated, nHits, totPages });
};
