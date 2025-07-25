import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { res201 } from "../../../lib/responseClient/res.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { err403, err500 } from "../../../lib/responseClient/err.js";
import { seq } from "../../../config/db.js";
import { CloudImg } from "../../../types/all/cloud.js";
import { delArrCloud } from "../../../lib/cloud/delete.js";
import { handleAddBook } from "../../../lib/sharedHandlers/books/addBook.js";
import { User } from "../../../models/all/User.js";

export const addBookWorker = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const bookStore = await BookStore.findOne({
    where: {
      id: bookStoreID,
    },
    include: [
      {
        model: User,
        as: "team",
        required: true,
        through: {
          where: {
            userID,
            role: UserRole.MANAGER,
          },
        },
      },
    ],
  });

  if (!bookStore)
    return err403(res, { msg: "Store not found or user not allowed" });

  const t = await seq.transaction();
  const images: CloudImg[] = [];

  try {
    const { bookCreated } = await handleAddBook({
      images,
      req,
      t,
    });

    await t.commit();

    return res201(res, { msg: "Book created", ID: bookCreated.id });
  } catch (err) {
    await t.rollback();

    if (images.length) await delArrCloud(images.map((el) => el.publicID));

    return err500(res);
  }
};
