import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { err404 } from "../../../lib/responseClient/err.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { Book } from "../../../models/all/Book.js";
import { Op } from "sequelize";
import { makeQueryBooksWorker } from "../../../lib/query/worker/books/query.js";
import { User } from "../../../models/all/User.js";
import { calcRatingSqlBooks } from "../../../lib/query/general/books.js";
import { sortAndPaginate } from "../../../lib/query/general/sortAndPaginate.js";

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
      include: [...calcRatingSqlBooks()],
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

  const { queryBooks, queryStores } = makeQueryBooksWorker(req);

  const books = await Book.findAll({
    where: queryBooks,
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        where: {
          ...queryStores,
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
      include: [...calcRatingSqlBooks()],
    },
  });

  const { paginated, totPages, nHits } = sortAndPaginate(req, books);

  return res200(res, { books: paginated, totPages, nHits });
};
