import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { BookStore, BookStoreInstance } from "../../../models/all/BookStore.js";
import { err404, err409, err500 } from "../../../lib/responseClient/err.js";
import { seq } from "../../../config/db.js";
import {
  deleteOldAssetsStore,
  handleGetDeletedAssetsStore,
  handleStoreAssetsPut,
} from "../../../lib/sharedHandlers/assetsHandlers/store.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { User } from "../../../models/all/User.js";
import {
  clearUnnecessary,
  handleAssetsCloud,
} from "../../adminRoutes/bookstores/helpers/cloudUpload.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import {
  allowedDeletePatchStore,
  StoreOrderStage,
} from "../../../types/all/orders.js";

export const updateStoreManager = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, body: bodyData } = req;
  const { bookStoreID } = req.params;

  const { videoData, imagesData } = (await handleAssetsCloud(req)) ?? {};

  const user = await User.findByPk(userID, {
    attributes: ["id", "email"],
  });

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
      {
        model: OrderStore,
        as: "orders",
      },
    ],
  });

  if (!bookStore) {
    await clearUnnecessary(videoData, imagesData);
    return err404(res, { msg: "bookstore not found" });
  }

  const t = await seq.transaction();

  try {
    const managersKeysPut = [
      "description",
      "deliveryPrice",
      "deliveryTime",
      "freeDeliveryAmount",
    ];

    const updatedData: Partial<BookStoreInstance> = {};

    for (const k of managersKeysPut) {
      updatedData[k as keyof BookStoreInstance] =
        bodyData[k] || (k === "description" ? null : 0);
    }

    updatedData.lastUpdatedBy = user!.email;

    await BookStore.update(updatedData, {
      where: {
        id: bookStoreID,
      },
      transaction: t,
    });

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

    await clearUnnecessary(videoData, imagesData);

    return err500(res);
  }
};
