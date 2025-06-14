import { Response } from "express";
import { BookStore } from "../../../models/all/BookStore.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { User } from "../../../models/all/User.js";
import { Book } from "../../../models/all/Book.js";
import { err404, err409, err500 } from "../../../lib/responseClient/err.js";
import { seq } from "../../../config/db.js";
import {
  delArrCloud,
  delCloud,
  ResourceType,
} from "../../../lib/cloud/delete.js";
import { Op } from "sequelize";
import { BookStoreUser } from "../../../models/all/BookStoreUser.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import {
  acceptedStageDeleteStore,
  StoreOrderStage,
} from "../../../types/all/orders.js";

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
      {
        model: OrderStore,
        as: "orders",
      },
      {
        model: OrderStore,
        as: "orders",
      },
    ],
  });

  if (!bookStore) return err404(res, { msg: "bookstore not found" });

  if (bookStore.orders?.length) {
    if (
      bookStore.orders.some(
        (os) => !acceptedStageDeleteStore.includes(os.stage as StoreOrderStage)
      )
    )
      return err409(res, {
        msg: "bookstore has orders that needs to be completed first",
      });
  }
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
        transaction: t,
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
