import { delCloud, ResourceType } from "../lib/cloud/delete.js";
import { calcTimeRun } from "../lib/utils/utils.js";
import { Book } from "../models/all/Book.js";
import { BookStore, BookStoreInstance } from "../models/all/BookStore.js";
import { BookStoreUser } from "../models/all/BookStoreUser.js";
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
    await Promise.all(
      videoStores.map(async (v) => await delCloud(v.publicID, ResourceType.VID))
    );
    await VideoBookStore.destroy({ where: {} });
  }

  const thumbs = await Thumb.findAll({
    where: {},
  });
  await Promise.all(thumbs.map(async (t) => await delCloud(t.publicID)));
  await Thumb.destroy({ where: {} });

  const books = await Book.findAll({ where: {} });
  if (books.length) {
    for (const b of books) {
      if (b.images?.length)
        await Promise.all(b.images.map(async (el) => delCloud(el.publicID)));

      await b.destroy();
    }
  }

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

export const delStores = async () => {
  calcTimeRun(async () => {
    const stores: BookStoreInstance[] = await BookStore.findAll({ where: {} });

    if (stores.length) {
      let i = 0;

      do {
        const curr = stores[i];

        const images = await ImgBookStore.findAll({
          where: { bookStoreID: curr.id },
        });
        if (images.length) {
          await Promise.all(
            images.map(async (i) => await delCloud(i.publicID))
          );
          await ImgBookStore.destroy({ where: { bookStoreID: curr.id } });
        }
        const videos = await VideoBookStore.findAll({
          where: { bookStoreID: curr.id },
        });
        if (videos.length) {
          await Promise.all(
            videos.map(
              async (v) => await delCloud(v.publicID, ResourceType.VID)
            )
          );
          await VideoBookStore.destroy({ where: { bookStoreID: curr.id } });
        }

        await BookStoreUser.destroy({
          where: { bookStoreID: curr.id },
        });

        await curr.destroy();

        i++;
      } while (i < stores.length);
    }
  });
};
