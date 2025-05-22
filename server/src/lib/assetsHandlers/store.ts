import { Op, Transaction } from "sequelize";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { CloudAsset } from "../../types/all/cloud.js";
import { ReqApp } from "../../types/types.js";
import { BookStoreInstance } from "../../models/all/BookStore.js";
import { delCloud, ResourceType } from "../cloud/delete.js";

export const handleGetDeletedAssetsStore = async ({
  bookStore,
  bodyData,
  t,
}: {
  bookStore: BookStoreInstance;
  bodyData: any;
  t: Transaction;
}) => {
  const newIds = new Set(
    bodyData.images?.length
      ? bodyData.images.map(
          (el: string) =>
            el.split("/").at(-2) +
            "/" +
            (el.split("/").pop() ?? "").split(".")[0]
        )
      : []
  ) as unknown as Set<string>;
  const deleteIds = bookStore.images?.length
    ? bookStore.images
        .filter((img: CloudAsset) => !newIds.has(img.publicID))
        .map((el: CloudAsset) => el.publicID)
    : [];

  await ImgBookStore.destroy({
    where: {
      publicID: {
        [Op.in]: deleteIds,
      },
    },
    transaction: t,
  });

  return { deleteIds };
};

export const handleStoreAssetsPut = async ({
  t,
  req,
  bookStore,
  imagesData,
  videoData,
}: {
  t: Transaction;
  req: ReqApp;
  bookStore: BookStoreInstance;
  imagesData: Partial<CloudAsset>[];
  videoData: Partial<CloudAsset> | null;
}) => {
  const bodyData = req.body;
  const { bookStoreID } = req.params;

  if (bookStore.video && (videoData || !bodyData?.video))
    await VideoBookStore.destroy({
      where: {
        bookStoreID,
      },
      transaction: t,
    });

  if (videoData)
    await VideoBookStore.create(
      {
        ...videoData,
        bookStoreID,
      },
      { transaction: t }
    );

  if (imagesData?.length) {
    if (bookStore?.images?.length)
      await ImgBookStore.destroy({
        where: {
          bookStoreID,
        },
        transaction: t,
      });

    await ImgBookStore.bulkCreate(
      imagesData.map((img: Partial<CloudAsset>) => ({
        ...img,
        bookStoreID,
      })),
      { transaction: t }
    );
  }
};

export const deleteOldAssetsStore = async ({
  bookStore,
  bodyData,
  videoData,
  imagesData,
  deleteIds,
}: {
  bookStore: BookStoreInstance;
  bodyData: any;
  videoData: Partial<CloudAsset> | null;
  imagesData: Partial<CloudAsset>[];
  deleteIds: string[];
}) => {
  try {
    if (bookStore.video && (videoData || !bodyData?.video))
      await delCloud(bookStore.video.publicID, ResourceType?.VID);

    if (imagesData?.length && bookStore?.images?.length)
      await Promise.all(bookStore.images.map((img) => delCloud(img.publicID)));
    if (deleteIds.length)
      await Promise.all(deleteIds.map((id) => delCloud(id)));
  } catch (err) {
    console.log(err);
  }
};
