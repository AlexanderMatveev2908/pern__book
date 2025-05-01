import { delCloud } from "../lib/cloud/delete.js";
import { calcTimeRun } from "../lib/utils/utils.js";
import { KeyCbcHmac } from "../models/all/KeyCbcHmac.js";
import { ImgBookStore } from "../models/all/img&video/ImgBookStore.js";
import { Thumb } from "../models/all/img&video/Thumb.js";
import { VideoBookStore } from "../models/all/img&video/VideoBookStore.js";
import { KeyRSA, Token, User } from "../models/models.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    await KeyRSA.destroy({ where: {} });
    await KeyCbcHmac.destroy({ where: {} });

    const thumbs = await Thumb.findAll({
      where: {},
    });
    await Promise.all(thumbs.map(async (t) => await delCloud(t.publicID)));
    await Thumb.destroy({ where: {} });

    await Token.destroy({ where: {} });
    await User.destroy({ where: {} });

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
