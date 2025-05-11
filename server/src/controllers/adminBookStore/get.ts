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
import { col, fn, literal, Op } from "sequelize";
import { seq } from "../../config/db.js";
import { Book } from "../../models/all/Book.js";
import { User } from "../../models/models.js";

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
        attributes: [],
      },
      {
        model: Book,
        as: "books",
        attributes: [],
      },
      {
        model: User,
        as: "workers",
        attributes: ["firstName", "lastName"],
        through: {
          attributes: ["id", "role"],
        },
        where: {},
        required: false,
      },
    ],
    // ? ADDING CUSTOM FIELDS IS LIKE USING $LOOKUP, THEN $UNWIND, THEN $SET( OR $ADD_FIELDS ON OLDER VERSIONS) WITH MONGOOSE(ODM OF MONGO_DB) FOR NO_SQL_LANGUAGE, AT THE END ITEMS TAKEN EACH ONE IN ITS OWN AS OBJ WITH ALL PROPS OF PARENT NEEDS TO BE GROUPED AGAIN AS ITEM OF A LIST(ITEM OF ARRAY AS ELEMENT), TO DO THAT WE NEED GROUP
    attributes: {
      include: [[literal("COALESCE(AVG(reviews.rating), 0)"), "avgRating"]],
    },
    group: [
      "BookStore.id",
      "images.id",
      "orders.id",
      "workers.id",
      "workers->BookStoreUser.id",
    ],
    having: queryAfterPipe,
  });

  return res200(res, { msg: "all good", bookStores });
};
