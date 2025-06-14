import { fileURLToPath } from "url";
import { seq } from "../../config/db.js";
import { hashPwd } from "../../lib/hashEncryptSign/argon.js";
import { __cg } from "../../lib/utils/log.js";
import { BookStore } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { User } from "../../models/all/User.js";
import { UserRole } from "../../types/types.js";
import path from "path";
import fs from "fs/promises";
import { doLorem, makeRandomMinMax, pickRandom } from "./placeHolders.js";
import { catStores, users } from "./data.js";

export const getAssetsPath = () =>
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
    "./assets_dev/books"
  );

export const createBooks = async () => {
  const booksDir = getAssetsPath();

  const authors = await fs.readdir(booksDir);

  for (const a of authors) {
    const authorDir = path.join(booksDir, a);
    const stat = await fs.stat(authorDir);

    if (!stat.isDirectory()) continue;

    const imgDirs = await fs.readdir(authorDir);

    for (const imgD of imgDirs) {
      const fullPathImg = path.join(authorDir, imgD);

      console.log(fullPathImg);
    }
  }
};

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
          name: `${u.firstName} ' bookstore`,

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
