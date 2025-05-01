import { delCloud, ResourceType } from "../lib/cloud/delete.js";
import { calcTimeRun } from "../lib/utils/utils.js";
import { BookStore, BookStoreInstance } from "../models/all/BookStore.js";
import { KeyCbcHmac } from "../models/all/KeyCbcHmac.js";
import { ImgBookStore } from "../models/all/img&video/ImgBookStore.js";
import { Thumb } from "../models/all/img&video/Thumb.js";
import { VideoBookStore } from "../models/all/img&video/VideoBookStore.js";
import { KeyRSA, Token, User } from "../models/models.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    await KeyRSA.destroy({ where: {} });
    await KeyCbcHmac.destroy({ where: {} });

    const imagesStores = await ImgBookStore.findAll({ where: {} });
    if (imagesStores.length) {
      await Promise.all(
        imagesStores.map(async (i) => await delCloud(i.publicID))
      );
    }
    await ImgBookStore.destroy({ where: {} });
  });
  const videoStores = await VideoBookStore.findAll({ where: {} });
  if (videoStores.length) {
    await Promise.all(videoStores.map(async (v) => await delCloud(v.publicID)));
    await VideoBookStore.destroy({ where: {} });
  }

  const thumbs = await Thumb.findAll({
    where: {},
  });
  await Promise.all(thumbs.map(async (t) => await delCloud(t.publicID)));
  await Thumb.destroy({ where: {} });

  await BookStore.destroy({ where: {} });
  await Token.destroy({ where: {} });
  await User.destroy({ where: {} });
};

export const getDataDB = async () => {
  const users = await User.findAll();

  // await User.update(
  //   { firstName: "newName" },
  //   {
  //     where: {
  //       id: 1,
  //     },
  //   }
  // );
};

export const delStore = async () => {
  calcTimeRun(async () => {
    const store: BookStoreInstance | null = await BookStore.findOne({
      where: { id: "875ac3e9-1458-4d12-8676-a494982b920a" },
    });

    const images = await ImgBookStore.findAll({
      where: { bookStoreID: store?.id },
    });
    const video = await VideoBookStore.findOne({
      where: { bookStoreID: store?.id },
    });
    if (!video) throw new Error("no video");

    await Promise.all(
      images.map(async (img) => await delCloud(img.publicID ?? ""))
    );
    await delCloud(video.publicID ?? "");
    await VideoBookStore.destroy({ where: { bookStoreID: store?.id } });
    await ImgBookStore.destroy({ where: { bookStoreID: store?.id } });
    await store?.destroy();
  });
};

export const testDelVideo = async () => {
  const video = await VideoBookStore.findOne({
    where: { bookStoreID: "964864e9-4271-4ff1-971e-ab1deca54e1c" },
  });

  calcTimeRun(async () => {
    await delCloud(video?.publicID ?? "", ResourceType.VID);
  });
};
