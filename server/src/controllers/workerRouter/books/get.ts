import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/models.js";
import { err404 } from "../../../lib/responseClient/err.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { Book } from "../../../models/all/Book.js";
import { literal, Op } from "sequelize";
import { countTo_5 } from "../../../lib/utils/utils.js";
import { replacePoint } from "../../../lib/dataStructures.js";
import { Literal } from "sequelize/lib/utils";
import { calcPagination } from "../../../lib/query/pagination.js";
import { makeQueryBooksWorker } from "../../../lib/query/worker/books/query.js";

export const getInfoStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const store = await BookStore.findOne({
    where: {
      id: bookStoreID,
    },
    attributes: ["categories", "id", "name"],
    include: [
      {
        model: User,
        as: "team",
        attributes: ["id"],
        required: true,
        through: {
          attributes: ["id", "role"],
          as: "bookStoreUser",
          where: {
            userID,
            role: UserRole.MANAGER,
          },
        },
      },
    ],
  });

  if (!store) return err404(res, { msg: "store not found" });

  return res200(res, { bookStore: store });
};

export const getBookWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookID } = req.params;
  const { roles } = req.query;

  const book = await Book.findOne({
    where: {
      id: bookID,
    },
    attributes: {
      include: [
        [
          literal(`(
            SELECT COALESCE(COUNT(DISTINCT r.id), 0)
            FROM reviews AS r
            WHERE r."bookID" = "Book".id
            )`),
          "reviewsCount",
        ],
        [
          literal(`(
            SELECT ROUND(COALESCE(AVG(r.rating), 0), 1)
            FROM reviews AS r
            WHERE r."bookID" = "Book".id
            )`),
          "avgRating",
        ],
        ...(countTo_5().map((pair) => [
          literal(`(
            SELECT COALESCE(COUNT(DISTINCT r.id), 0)
            FROM reviews AS r
            WHERE r."bookID" = "Book".id
            AND r.rating BETWEEN ${pair[0]} AND ${pair[1]}  
            )`),
          `reviews__${replacePoint(pair[0])}__${replacePoint(pair[1])}`,
        ]) as [Literal, string][]),
      ],
    },
    group: [
      "Book.id",
      "store.id",
      "store->team.id",
      "store->team->bookStoreUser.id",
    ],
    include: [
      {
        model: BookStore,
        as: "store",
        attributes: ["id", "categories", "name"],
        required: true,
        include: [
          {
            model: User,
            as: "team",
            attributes: ["id"],
            required: true,
            through: {
              as: "bookStoreUser",
              where: {
                userID,
                role: {
                  [Op.in]: ((roles as string) ?? "").split(","),
                },
              },
            },
          },
        ],
      },
    ],
  });

  if (!book) return err404(res, { msg: "book not found" });

  return res200(res, { msg: "book", book });
};

export const getBookListWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const { queryBooks } = makeQueryBooksWorker(req);

  const books = await Book.findAll({
    where: queryBooks,
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        where: {
          id: bookStoreID,
        },
        include: [
          {
            model: User,
            as: "team",
            attributes: ["id"],
            required: true,
            through: {
              as: "bookStoreUser",
              where: {
                userID,
              },
            },
          },
        ],
      },
    ],
    attributes: {
      include: [
        [
          literal(`(
            SELECT COALESCE(COUNT(DISTINCT r.id), 0)
            FROM reviews AS r
            WHERE r."bookID" = "Book".id
            )`),
          "reviewsCount",
        ],
        [
          literal(`(
            SELECT ROUND(COALESCE(AVG(r.rating), 0), 1)
            FROM reviews AS r
            WHERE r."bookID" = "Book".id
            )`),
          "avgRating",
        ],

        ...(countTo_5().map((pair) => [
          literal(`(
            SELECT COALESCE(COUNT(DISTINCT r.id), 0)
            FROM reviews AS r
            WHERE r."bookID" = "Book".id
            AND r.rating BETWEEN ${pair[0]} AND ${pair[1]}  
            )`),
          `reviews__${replacePoint(pair[0])}__${replacePoint(pair[1])}`,
        ]) as [Literal, string][]),
      ],
    },
  });

  const nHits = books.length;

  if (!nHits) return res204(res);

  const { paginated, totPages } = calcPagination({
    req,
    nHits,
    els: books,
  });

  return res200(res, { books: paginated, totPages, nHits });
};
