import { Response } from "express";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp, UserRole } from "../../../types/types.js";
import { Book, BookInstance } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/models.js";
import { err403, err500 } from "../../../lib/responseClient/err.js";
import { isArrEq } from "../../../lib/dataStructures.js";
import { seq } from "../../../config/db.js";
import { CloudImg } from "../../../types/all/cloud.js";
import { uploadCloudMemory } from "../../../lib/cloud/imagesMemory.js";
import { handleAssetsBooksPut } from "../../../lib/sharedHandlers/assetsHandlers/books.js";
import { delArrCloud } from "../../../lib/cloud/delete.js";
import { captAll } from "../../../lib/utils/formatters.js";

export const updateBookWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { bookID } = req.params;
  const { userID, body } = req;

  const user = await User.findByPk(userID, {
    attributes: ["id", "email"],
  });

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

  const bookObj = book.toJSON();
  bookObj.lastUpdatedBy = user!.email;

  const [{ bookStoreUser: { role } = {} } = {}]: any =
    bookObj?.store?.team ?? [];

  for (const key in body) {
    if (key === "images") continue;

    const valBook = bookObj[key as keyof BookInstance];
    const valBody = body[key];

    if (["title", "author", "year", "categories", "price"].includes(key)) {
      switch (key) {
        case "categories":
          if (!isArrEq(valBody, valBook) && role !== UserRole.MANAGER)
            return err403(res, { msg: "user not allowed" });
          bookObj[key] = valBody;
          break;

        case "year":
        case "price":
          if (+valBody !== +valBook && role !== UserRole.MANAGER)
            return err403(res, { msg: "user not allowed" });
          bookObj[key] = +valBody;
          break;

        default:
          if (valBody !== valBook && role !== UserRole.MANAGER)
            return err403(res, { msg: "user not allowed" });
          (bookObj as any)[key] = captAll(valBody);
          break;
      }
    } else {
      (bookObj as any)[key] = valBody;
    }
  }

  let uploadedNow: CloudImg[] = [];
  const toDeleteIds: string[] = [];

  const t = await seq.transaction();

  try {
    await handleAssetsBooksPut({
      bookObj,
      req,
      uploadedNow,
      toDeleteIds,
    });

    await Book.update(bookObj, {
      where: { id: bookID },
      transaction: t,
    });

    await t.commit();

    await delArrCloud(toDeleteIds);

    return res200(res, { msg: "Book updated" });
  } catch (err) {
    await t.rollback();

    if (uploadedNow.length)
      await delArrCloud(uploadedNow.map((img) => img.publicID));

    return err500(res);
  }
};
