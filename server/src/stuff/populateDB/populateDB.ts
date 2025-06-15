import { seq } from "../../config/db.js";
import { hashPwd } from "../../lib/hashEncryptSign/argon.js";
import { __cg } from "../../lib/utils/log.js";
import { BookStore } from "../../models/all/BookStore.js";
import { User } from "../../models/all/User.js";
import { doLorem } from "./placeHolders.js";
import { catStores, users } from "./data.js";
import {
  generateBooks,
  generateJunction,
  makeRandomMinMax,
  pickRandom,
} from "./helpers.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import {
  createBooksAssets,
  generateStoresAssets,
  generateVideoStores,
} from "./assetsHelpers.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";

export const populateDB = async () => {
  const safeUsers = await Promise.all(
    users.map(async (u) => {
      u.password = await hashPwd(u.password);
      return u;
    })
  );

  const t = await seq.transaction();
  try {
    const newUsers = await User.bulkCreate(safeUsers, { transaction: t });

    for (const u of newUsers) {
      const { uploaded } = await generateStoresAssets(
        u.firstName.toLowerCase()
      );

      const store = await BookStore.create(
        {
          ownerID: u.id,
          name: `${u.firstName} 's bookstore`,

          categories: Array.from({ length: 3 }, () => pickRandom(catStores)),
          description: doLorem(20),

          email: u.email,
          phone: u.phone,

          country: u.country,
          state: u.state,
          city: u.city,
          street: u.street,
          zipCode: u.zipCode,

          deliveryPrice: makeRandomMinMax(0, 100).toFixed(2),
          freeDeliveryAmount: makeRandomMinMax(0, 100).toFixed(2),
          deliveryTime: makeRandomMinMax(0, 100).toFixed(0),

          lastUpdatedBy: u.email,
        },
        { transaction: t }
      );

      for (const up of uploaded) {
        await ImgBookStore.create(
          {
            bookStoreID: store.id,
            url: up.url,
            publicID: up.publicID,
          },
          { transaction: t }
        );
      }

      const vid = await generateVideoStores();

      await VideoBookStore.create(
        {
          bookStoreID: store.id,
          ...vid,
        },
        {
          transaction: t,
        }
      );
    }

    const tyler = newUsers.find((w) => w.email === "tyler@gmail.com");

    for (const u of newUsers) {
      const store = await BookStore.findOne({
        where: {
          ownerID: u.id,
        },
        transaction: t,
      });

      switch (u.email) {
        case "jane@gmail.com": {
          await generateJunction({
            email: "jane@gmail.com",
            tyler: tyler!,
            store: store!,
            t,
          });

          const { uploaded, images } = await createBooksAssets([
            "virginia_woolf",
          ]);

          await generateBooks({
            uploaded,
            images,
            t,
            u,
            store: store!,
          });

          break;
        }

        case "tyler@gmail.com": {
          const { uploaded, images } = await createBooksAssets([
            "albert_camus",
            "jean_paul_sartre",
            "jean_jack_rousseau",
          ]);

          await generateBooks({
            uploaded,
            images,
            t,
            u,
            store: store!,
          });

          break;
        }

        case "john@gmail.com": {
          await generateJunction({
            email: "john@gmail.com",
            tyler: tyler!,
            store: store!,
            t,
          });

          const { uploaded, images } = await createBooksAssets([
            "hernest_hemingway",
          ]);

          await generateBooks({
            uploaded,
            images,
            t,
            u,
            store: store!,
          });

          break;
        }

        default:
          break;
      }
    }

    await t.commit();
  } catch (error) {
    __cg("populate err", error);

    await t.rollback();
  }
};
