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
import { Order } from "../../models/all/Order.js";
import { Review } from "../../models/all/Review.js";
import { seq } from "../../config/db.js";
import { Book } from "../../models/all/Book.js";
import { User } from "../../models/models.js";
import { literal } from "sequelize";

const calcAvgSeq = (prop: string, res: string) => [
  seq.fn("ROUND", seq.fn("COALESCE", seq.fn("AVG", seq.col(prop)), 0), 2),
  res,
];

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
        attributes: ["rating", "id"],
      },
      {
        model: Book,
        as: "books",
        attributes: ["id", "qty", "price"],
      },
      {
        model: User,
        as: "workers",
        attributes: ["firstName", "lastName"],
        through: {
          attributes: ["id", "role", "bookStoreID", "userID"],
        },
        where: {},
        required: false,
      },
    ],
    // ? ADDING CUSTOM FIELDS IS LIKE USING $LOOKUP, THEN $UNWIND, THEN $SET( OR $ADD_FIELDS ON OLDER VERSIONS) WITH MONGOOSE(ODM OF MONGO_DB) FOR NO_SQL_LANGUAGE, AT THE END ITEMS TAKEN EACH ONE IN ITS OWN AS OBJ WITH ALL PROPS OF PARENT NEEDS TO BE GROUPED AGAIN AS ITEM OF A LIST(ITEM OF ARRAY AS ELEMENT), TO DO THAT WE NEED GROUP
    attributes: {
      include: [
        calcAvgSeq("reviews.rating", "avgRating"),
        calcAvgSeq("books.price", "avgPrice"),
        calcAvgSeq("books.qty", "avgQty"),
        [
          seq.literal(
            `(SELECT COALESCE(COUNT(DISTINCT "book_stores_users"."userID"), 0) 
             FROM "book_stores_users" 
             WHERE "book_stores_users"."bookStoreID" = "BookStore"."id")`
          ),
          "workersCount",
        ],
      ] as any,
    },
    group: [
      "BookStore.id",
      "images.id",
      "books.id",
      "orders.id",
      "reviews.id",
      "workers.id",
      "workers->BookStoreUser.id",
    ],
    having: queryAfterPipe,
    // limit: limit as number,
    // offset: skip,
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  const { skip, limit, totPages } = calcPagination(req, nHits);
  const paginated = bookStores.slice(skip, +skip! + +limit!);

  return res200(res, { bookStores: paginated, nHits, totPages });
};
