import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import {
  clearUnnecessary,
  handleAssetsCloud,
} from "../../adminBookStore/helpers/cloudUpload.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/models.js";
import { err404, err500 } from "../../../lib/responseClient/err.js";
import { seq } from "../../../config/db.js";
import {
  deleteOldAssetsStore,
  handleGetDeletedAssetsStore,
  handleStoreAssetsPut,
} from "../../../lib/assetsHandlers/store.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";

export const updateStoreManager = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, body: bodyData } = req;
  const { bookStoreID } = req.params;

  const { videoData, imagesData } = (await handleAssetsCloud(req)) ?? {};

  const bookStore = await BookStore.findOne({
    where: {
      id: bookStoreID,
    },
    include: [
      {
        model: User,
        as: "team",
        required: true,
        attributes: ["id"],
        through: {
          attributes: ["id"],
          where: {
            userID,
            role: UserRole.MANAGER,
          },
        },
      },
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: VideoBookStore,
        as: "video",
      },
    ],
  });

  if (!bookStore) {
    await clearUnnecessary(videoData, imagesData);
    return err404(res, { msg: "bookstore not found" });
  }

  const t = await seq.transaction();

  try {
    await handleStoreAssetsPut({
      t,
      req,
      bookStore,
      imagesData,
      videoData,
    });

    const { deleteIds } = await handleGetDeletedAssetsStore({
      bookStore,
      bodyData,
      t,
    });

    await t.commit();

    await deleteOldAssetsStore({
      bookStore,
      bodyData,
      videoData,
      imagesData,
      deleteIds,
    });

    return res200(res, { msg: "bookstore updated" });
  } catch (err: any) {
    await t.rollback();

    console.log(err);

    await clearUnnecessary(videoData, imagesData);

    return err500(res);
  }
};
