import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { Book } from "../../../models/all/Book.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { err403, err500 } from "../../../lib/responseClient/err.js";
import { delArrCloud } from "../../../lib/cloud/delete.js";
import { User } from "../../../models/all/User.js";
import { seq } from "../../../config/db.js";
import { OrderItemStore } from "../../../models/all/OrderItemStore.js";

export const deleteBookWorker = async (req: ReqApp, res: Response) => {
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
        include: [
          {
            model: User,
            as: "team",
            required: true,
            through: {
              as: "bookStoreUsers",
              where: {
                userID,
                role: UserRole.MANAGER,
              },
            },
          },
        ],
      },
    ],
  });

  if (!book) return err403(res, { msg: "book not found or user not allowed" });

  const t = await seq.transaction();

  try {
    await Book.destroy({
      where: {
        id: bookID,
      },
      transaction: t,
    });

    await t.commit();

    if (book.images?.length)
      await delArrCloud(book.images.map((img) => img.publicID));

    return res200(res, { msg: "book deleted" });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};
