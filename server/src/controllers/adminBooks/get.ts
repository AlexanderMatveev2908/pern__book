import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { BookStore } from "../../models/all/BookStore.js";
import { err404 } from "../../lib/responseClient/err.js";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { Book } from "../../models/all/Book.js";
import { calcPagination } from "../../lib/query/pagination.js";
import { literal } from "sequelize";

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
        attributes: ["id"],
        required: true,
      },
    ],
    group: ["Book.id", "store.id"],
    attributes: {
      include: [[literal(`"store"."categories"`), "mainCategories"]],
    },
  });

  const nHits = books.length;
  if (!nHits) return res204(res);

  const { skip, totPages, limit } = calcPagination(req, nHits);

  const paginated = books.slice(skip, skip + limit);

  return res200(res, { books: paginated, nHits, totPages });
};
