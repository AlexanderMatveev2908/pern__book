import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Book, BookInstance } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/models.js";
import { err403 } from "../../../lib/responseClient/err.js";
import { __cg } from "../../../lib/utils/log.js";
import { isArrEq } from "../../../lib/dataStructures.js";

export const updateBookWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { bookID } = req.params;
  const { userID, body } = req;
  const files = req.files as Express.Multer.File[];

  const book: BookInstance | null = await Book.findOne({
    where: {
      id: bookID,
    },
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        include: [
          {
            model: User,
            as: "team",
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
  });

  if (!book) return err403(res, { msg: "book not found or user not allowed" });

  const [{ bookStoreUser: { role } = {} } = {}]: any = book?.store?.team ?? [];

  const updatedObj: BookInstance = {};

  console.log("----------------------------------");
  for (const key in body) {
    if (key === "images") continue;

    const valBook = book[key as keyof BookInstance];
    const valBody = body[key];

    if (["title", "author", "year", "categories", "price"].includes(key)) {
      switch (key) {
        case "categories":
          __cg("cat", isArrEq(valBody, valBook));
          break;
        case "year":
        case "qty":
          __cg(key, +valBody === +valBook);
          break;

        default:
          __cg(key, valBody === valBook);
      }
    }
  }

  return res200(res, { msg: "book updated" });
};
