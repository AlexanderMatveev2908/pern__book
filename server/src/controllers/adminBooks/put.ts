import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { BookStore, BookStoreInstance } from "../../models/all/BookStore.js";
import { Book, BookInstance } from "../../models/all/Book.js";
import { err404, err500 } from "../../lib/responseClient/err.js";
import { CloudImg } from "../../types/all/cloud.js";
import { seq } from "../../config/db.js";
import { uploadCloudMemory } from "../../lib/cloud/imagesMemory.js";
import { getCloudID } from "../../lib/utils/ids.js";
import { captAll } from "../../lib/utils/formatters.js";
import { delArrCloud } from "../../lib/cloud/delete.js";

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

  const storeObj: BookStoreInstance = stores[0].toJSON();
  const bookObj: BookInstance | undefined = storeObj?.books?.[0];
  if (!bookObj) return err404(res, { msg: "book not found" });

  const existingImages = bookObj.images ?? [];
  let uploadedNow: CloudImg[] = [];
  const toDeleteIds: string[] = [];

  const t = await seq.transaction();

  try {
    if (files.length)
      uploadedNow = await Promise.all(
        files.map(async (f) => await uploadCloudMemory(f, "books"))
      );

    if (uploadedNow.length) {
      toDeleteIds.push(...existingImages.map((el) => el.publicID));
      bookObj.images = uploadedNow;
    }

    if (!uploadedNow.length && existingImages?.length) {
      const newIds = !body.images?.length
        ? null
        : new Set(body.images.map((url: string) => getCloudID(url)));

      if (newIds instanceof Set) {
        for (const img of existingImages) {
          if (!newIds.has(img.publicID)) toDeleteIds.push(img.publicID);
        }
      } else {
        toDeleteIds.push(...existingImages.map((el) => el.publicID));
      }

      bookObj.images = existingImages.filter(
        (img) => !toDeleteIds.includes(img.publicID)
      );
    }

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

    await Book.update(bookObj, { where: { id: bookID }, transaction: t });

    await t.commit();

    await delArrCloud(toDeleteIds);

    return res200(res, { msg: "Book updated" });
  } catch (err) {
    await t.rollback();

    console.log(err);

    if (uploadedNow.length)
      await delArrCloud(uploadedNow.map((img) => img.publicID));

    return err500(res);
  }
};
