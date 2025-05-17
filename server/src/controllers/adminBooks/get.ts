import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { BookStore } from "../../models/all/BookStore.js";
import { err404 } from "../../lib/responseClient/err.js";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { Book } from "../../models/all/Book.js";
import { calcPagination } from "../../lib/query/pagination.js";
import { literal } from "sequelize";
import { Review } from "../../models/all/Review.js";
import { replacePoint } from "../../lib/validateDataStructure.js";
import { Literal } from "sequelize/lib/utils";

const calcRatingSql = (): [Literal, string][] => [
  [literal(`COALESCE(COUNT(DISTINCT("reviews"."id")), 0)`), "reviewsCount"],
  [literal(`ROUND(COALESCE(AVG("reviews"."rating"), 0), 1)`), "avgRating"],
  ...([
    [0, 1],
    [1.1, 2],
    [2.1, 3],
    [3.1, 4],
    [4.1, 5],
  ].map((pair) => [
    literal(`(SELECT COALESCE(COUNT(DISTINCT r.id) , 0)
                FROM "reviews" AS r
                WHERE r.rating BETWEEN ${pair[0]} AND ${pair[1]}
              )`),
    `reviews__${replacePoint(pair[0])}__${replacePoint(pair[1])}`,
  ]) as [Literal, string][]),
];

export const getStoreInfo = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const stores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
    attributes: ["id", "name", "categories"],
  });

  if (!stores.length) return err404(res, { msg: "user does not have stores" });

  return res200(res, { stores });
};

export const getInfoBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookID } = req.params;

  const stores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
    include: [
      {
        model: Book,
        as: "books",
        where: {},
        required: true,
      },
    ],
    nest: true,
  });

  const objs = stores.map((el) => el.toJSON());

  if (!objs.length) return err404(res, { msg: "user does not have stores" });
  if (!objs?.[0]?.books?.length) return err404(res, { msg: "book not found" });

  return res200(res, { book: objs[0].books[0] });
};

export const getMyBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookID } = req.params;

  const book = await Book.findOne({
    where: {
      id: bookID,
    },
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        where: { ownerID: userID },
      },
      {
        model: Review,
        as: "reviews",
      },
    ],
    attributes: {
      include: [
        [literal(`"store"."categories"`), "mainCategories"],
        ...calcRatingSql(),
      ],
    },
    group: ["Book.id", "store.id", "reviews.id"],
  });

  return res200(res, { book });
};

export const getBooksList = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const books = await Book.findAll({
    where: {},
    include: [
      {
        model: BookStore,
        as: "store",
        where: {
          ownerID: userID,
        },
        attributes: ["id", "name", "categories"],
        required: true,
      },
      {
        model: Review,
        as: "reviews",
      },
    ],
    group: ["Book.id", "store.id", "reviews.id"],
    attributes: {
      include: [
        [literal(`"store"."categories"`), "mainCategories"],

        ...calcRatingSql(),
      ],
    },
  });

  const nHits = books.length;
  if (!nHits) return res204(res);

  const { skip, totPages, limit } = calcPagination(req, nHits);

  const paginated = books.slice(skip, skip + limit);

  return res200(res, { books: paginated, nHits, totPages });
};
