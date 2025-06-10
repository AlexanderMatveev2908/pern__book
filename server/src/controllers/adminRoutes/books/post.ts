import { Response } from "express";
import { BookStore } from "../../../models/all/BookStore.js";
import { err404, err500 } from "../../../lib/responseClient/err.js";
import { seq } from "../../../config/db.js";
import { CloudImg } from "../../../types/all/cloud.js";
import { handleAddBook } from "../../../lib/sharedHandlers/books/addBook.js";
import { ReqApp } from "../../../types/types.js";
import { res201 } from "../../../lib/responseClient/res.js";
import { delArrCloud } from "../../../lib/cloud/delete.js";

export const createBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { body } = req;
  const files = req.files as Express.Multer.File[];

  const store = await BookStore.findOne({
    where: {
      id: body.bookStoreID,
    },
  });
  if (!store) return err404(res, { msg: "Store not found" });

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
  } catch (err: any) {
    await t.rollback();

    if (images.length) await delArrCloud(images.map((el) => el.publicID));

    return err500(res);
  }
};
