import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { BookStore } from "../../models/all/BookStore.js";
import { Book } from "../../models/all/Book.js";
import { err404 } from "../../lib/responseClient/err.js";

export const updateBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID, body } = req;
  const { bookID } = req.params;

  const files = req.files as Express.Multer.File[];

  const stores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
    include: [
      {
        model: Book,
        as: "books",
        where: { id: bookID },
        required: true,
      },
    ],
    nest: true,
  });

  if (!stores.length) return err404(res, { msg: "user does not have stores" });

  const obj = stores[0].toJSON();

  console.log(obj);

  return res200(res, { msg: "Book updated" });
};
