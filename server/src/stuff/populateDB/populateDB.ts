import { seq } from "../../config/db.js";
import { hashPwd } from "../../lib/hashEncryptSign/argon.js";
import { __cg } from "../../lib/utils/log.js";
import { BookStore } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { User } from "../../models/all/User.js";
import { UserRole } from "../../types/types.js";
import { doLorem, makeRandomMinMax, pickRandom } from "./placeHolders.js";
import { catStores, fillDefVals, getValidCat, users } from "./data.js";
import { Book } from "../../models/all/Book.js";
import { createBooksAssets } from "./helpers.js";

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
      await BookStore.create(
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
    }

    const tyler = newUsers.find((w) => w.email === "tyler@gmail.com");

    for (const u of newUsers) {
      switch (u.email) {
        case "jane@gmail.com": {
          const store = await BookStore.findOne({
            where: {
              ownerID: u.id,
            },
            transaction: t,
          });

          await BookStoreUser.create(
            {
              userID: tyler!.id,
              bookStoreID: store!.id,
              userEmail: tyler!.email,
              role: UserRole.MANAGER,
            },
            { transaction: t }
          );

          const { uploaded, images } = await createBooksAssets([
            "virginia_woolf",
          ]);

          let i = 0;

          while (i < uploaded.length) {
            await Book.create(
              {
                title: images[i].title,
                author: "virginia_woolf",
                ...fillDefVals({ min: 1900, max: 1942, u, store: store! }),
                images: [
                  {
                    url: uploaded[i].url,
                    publicID: uploaded[i].publicID,
                  },
                ],
              },
              { transaction: t }
            );
            i++;
          }

          break;
        }

        case "john@gmail.com": {
          const store = await BookStore.findOne({
            where: {
              ownerID: u.id,
            },
            transaction: t,
          });

          await BookStoreUser.create(
            {
              userID: tyler!.id,
              userEmail: tyler!.email,
              bookStoreID: store!.id,
              role: UserRole.EMPLOYEE,
            },
            { transaction: t }
          );

          const { uploaded, images } = await createBooksAssets([
            "hernest_hemingway",
          ]);

          let i = 0;

          while (i < uploaded.length) {
            await Book.create(
              {
                title: images[i].title,
                author: "hernest_hemingway",
                ...fillDefVals({ min: 1920, max: 1961, u, store: store! }),
                images: [
                  {
                    url: uploaded[i].url,
                    publicID: uploaded[i].publicID,
                  },
                ],
              },
              { transaction: t }
            );

            i++;
          }

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
