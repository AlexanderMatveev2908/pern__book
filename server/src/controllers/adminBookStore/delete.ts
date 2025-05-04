import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { getStoreByID } from "./helpers/storeData.js";
import { res200 } from "../../lib/responseClient/res.js";
import { err404, err500 } from "../../lib/responseClient/err.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { seq } from "../../config/db.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { Op } from "sequelize";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { delCloud, ResourceType } from "../../lib/cloud/delete.js";

export const deleteStore = async (req: ReqApp, res: Response): Promise<any> => {
  const bookStore = await getStoreByID(req);

  if (!bookStore) return err404(res, { msg: "bookstore not found" });
  const team = await BookStoreUser.findAll({
    where: {
      bookStoreID: bookStore.id,
    },
  });

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
    if (team.length)
      await BookStoreUser.destroy({
        where: {
          bookStoreID: bookStore.id,
        },
        transaction: t,
      });

    await bookStore.destroy({ transaction: t });

    await t.commit();

    try {
      if (bookStore.video)
        await delCloud(bookStore.video.publicID, ResourceType.VID);
      if (bookStore?.images?.length)
        await Promise.all(
          bookStore.images.map(async (el) => await delCloud(el.publicID))
        );
    } catch (err) {
      console.log(err);
    }

    return res200(res, { msg: "store deleted" });
  } catch (err) {
    console.log(err);
    await t.rollback();

    return err500(res);
  }
};
