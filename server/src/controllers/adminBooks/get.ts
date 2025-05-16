import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { BookStore } from "../../models/all/BookStore.js";
import { err404 } from "../../lib/responseClient/err.js";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { Book } from "../../models/all/Book.js";

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
  });

  if (!books.length) return res204(res);

  return res200(res, { books });
};
