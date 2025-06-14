import { seq } from "../config/db.js";
import { hashPwd } from "../lib/hashEncryptSign/argon.js";
import { __cg } from "../lib/utils/log.js";
import { BookStore } from "../models/all/BookStore.js";
import { BookStoreUser } from "../models/all/BookStoreUser.js";
import { User, UserInstance } from "../models/all/User.js";
import { CatBookStore } from "../types/all/bookStore.js";
import { UserRole } from "../types/types.js";

const l = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quidem dignissimos, voluptatum vero consequuntur aperiam ratione iure sunt aut porro dolor deleniti. Exercitationem maiores, dolores commodi veniam vitae voluptatem quod!`;

export const doLorem = (n: number = 1) => {
  return l.repeat(n);
};

export const makeRandomMinMax = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const pickRandom = (arr: any[]) =>
  arr[Math.floor(makeRandomMinMax(0, arr.length))];

const commonFields = {
  isVerified: true,
  password: "8cLS4XY!{2Wdvl4*l^4",
};
const users = [
  {
    firstName: "Tyler",
    lastName: "Durden",
    email: "tyler@gmail.com",

    country: "US",
    state: "CA",
    city: "Los Angeles",
    street: "456 Sunset Blvd",
    zipCode: "90028",
    phone: "+0 123-456-7890",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",

    country: "US",
    state: "NY",
    city: "New York",
    street: "789 Broadway Ave",
    zipCode: "10003",
    phone: "+1 234-567-8901",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",

    country: "US",
    state: "IL",
    city: "Chicago",
    street: "321 Lakeshore Dr",
    zipCode: "60601",
    phone: "+2 345-678-9012",
  },
].map((el) => ({
  ...el,
  ...commonFields,
}));

const catStores = Object.values(CatBookStore);
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
