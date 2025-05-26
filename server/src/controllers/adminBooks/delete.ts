import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { Book } from "../../models/all/Book.js";
import { BookStore } from "../../models/all/BookStore.js";
import { res200 } from "../../lib/responseClient/res.js";
import { err404, err500 } from "../../lib/responseClient/err.js";
import { seq } from "../../config/db.js";
import { delArrCloud } from "../../lib/cloud/delete.js";

export const deleteBook = async (req: ReqApp, res: Response): Promise<any> => {
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
        where: {
          ownerID: userID,
        },
        attributes: ["id"],
      },
    ],
  });

  if (!book) return err404(res, { msg: "Book not found" });

  await book.destroy();

  if (book.images?.length)
    await delArrCloud(book.images.map((img) => img.publicID));

  return res200(res, { book });
};
