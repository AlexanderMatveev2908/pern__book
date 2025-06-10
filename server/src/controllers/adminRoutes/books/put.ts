import { Response } from "express";
import { Book } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/all/User.js";
import { err404, err500 } from "../../../lib/responseClient/err.js";
import { CloudImg } from "../../../types/all/cloud.js";
import { seq } from "../../../config/db.js";
import { handleAssetsBooksPut } from "../../../lib/sharedHandlers/assetsHandlers/books.js";
import { captAll } from "../../../lib/utils/formatters.js";
import { ReqApp } from "../../../types/types.js";
import { delArrCloud } from "../../../lib/cloud/delete.js";
import { res200 } from "../../../lib/responseClient/res.js";

export const updateBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID, body } = req;
  const { bookID } = req.params;
  const files = req.files as Express.Multer.File[];

  const bookObj = await Book.findOne({
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
    ],
    raw: true,
  });

  const user = await User.findByPk(userID, {
    attributes: ["id", "email"],
  });

  if (!bookObj) return err404(res, { msg: "Book not found" });

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

    for (const key in body) {
      if (key === "images") continue;

      if (["title", "author"].includes(key)) {
        (bookObj as any)[key] = captAll(body[key]);
      } else if (key === "description") {
        bookObj[key] = body?.[key] ?? null;
      } else {
        (bookObj as any)[key] = body[key];
      }
    }

    bookObj.lastUpdatedBy = user!.email;

    await Book.update(bookObj, { where: { id: bookID }, transaction: t });

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
