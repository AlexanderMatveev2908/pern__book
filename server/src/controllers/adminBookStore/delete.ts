import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import { err404, err500 } from "../../lib/responseClient/err.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { seq } from "../../config/db.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { Op } from "sequelize";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { delArrCloud, delCloud, ResourceType } from "../../lib/cloud/delete.js";
import { BookStore } from "../../models/all/BookStore.js";
import { Book } from "../../models/all/Book.js";
import { User } from "../../models/all/User.js";

export const deleteStore = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const bookStore = await BookStore.findOne({
    where: {
      ownerID: userID,
      id: bookStoreID,
    },
    include: [
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: VideoBookStore,
        as: "video",
      },
      {
        model: User,
        as: "team",
      },
      {
        model: Book,
        as: "books",
      },
    ],
  });

  if (!bookStore) return err404(res, { msg: "bookstore not found" });

  const t = await seq.transaction();

  try {
    if (bookStore?.images?.length)
      await ImgBookStore.destroy({
        where: {
          bookStoreID: bookStore.id,
        },
        transaction: t,
      });
    if (bookStore?.video)
      await VideoBookStore.destroy({
        where: {
          bookStoreID: bookStore.id,
        },
        transaction: t,
      });
    if (bookStore?.team?.length)
      await BookStoreUser.destroy({
        where: {
          bookStoreID: bookStore.id,
        },
        transaction: t,
      });
    if (bookStore?.books?.length)
      await Book.destroy({
        where: {
          id: {
            [Op.in]: bookStore.books.map((el) => el.id),
          },
        },
      });

    await bookStore.destroy({ transaction: t });

    await t.commit();

    if (bookStore.video)
      await delCloud(bookStore.video.publicID, ResourceType.VID);
    if (bookStore?.images?.length)
      await delArrCloud(bookStore.images.map((el) => el.publicID));

    if (bookStore?.books?.length)
      await delArrCloud(
        bookStore.books.flatMap((book) =>
          book.images?.length ? book.images.map((img) => img.publicID) : []
        )
      );

    return res200(res, { msg: "store deleted" });
  } catch (err) {
    await t.rollback();

    return err500(res);
  }
};
