import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200, res201 } from "../../lib/responseClient/res.js";
import { BookStore } from "../../models/all/BookStore.js";
import { err404, err500 } from "../../lib/responseClient/err.js";
import { seq } from "../../config/db.js";
import { CloudImg } from "../../types/all/cloud.js";
import { uploadCloudMemory } from "../../lib/cloud/imagesMemory.js";
import { delCloud, ResourceType } from "../../lib/cloud/delete.js";
import { Book, BookInstance } from "../../models/all/Book.js";

export const createBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { body } = req;
  const files = req.files as Express.Multer.File[];

  const store = await BookStore.findOne({
    where: {
      id: body.store,
    },
  });
  if (!store) return err404(res, { msg: "Store not found" });

  const t = await seq.transaction();
  const images: CloudImg[] = [];

  try {
    if (files?.length) {
      for (const f of files) {
        const img = await uploadCloudMemory(f, "books");
        images.push(img);
      }
    }

    const newBook = {} as Partial<BookInstance>;

    for (const key in body) {
      if (key === "description") {
        newBook[key] = body?.[key] ?? null;
      } else {
        newBook[key as keyof BookInstance] = body[key];
      }
    }

    if (images) newBook.images = images;

    await Book.create(newBook, { transaction: t });

    await t.commit();

    return res201(res, { msg: "Book created" });
  } catch (err: any) {
    console.log(err);

    await t.rollback();

    if (images.length) {
      try {
        await Promise.all(
          images.map(async (el) => delCloud(el.publicID, ResourceType.IMG))
        );
      } catch (error) {
        console.log(err);
      }
    }

    return err500(res);
  }
};
