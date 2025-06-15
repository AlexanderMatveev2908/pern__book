import { fileURLToPath } from "url";
import path from "path";
import { Book } from "../../models/all/Book.js";
import { Transaction } from "sequelize";
import { UserInstance } from "../../models/all/User.js";
import { BookStoreInstance } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { UserRole } from "../../types/types.js";
import { createBooksAssets } from "./assetsHelpers.js";
import { doLorem } from "./placeHolders.js";
import { CatBookStore } from "../../types/all/bookStore.js";
import { subcategories } from "../../types/all/books.js";

export const getAssetsPath = (frag: string) =>
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
    `./assets_dev/${frag}`
  );

export const makeRandomMinMax = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const pickRandom = (arr: any[]) =>
  arr[Math.floor(makeRandomMinMax(0, arr.length))];

export const getValidCat = (mainCat: CatBookStore[]) => {
  const allowed = Object.entries(subcategories)
    .filter(([k, v]) => mainCat.some((el) => el === k))
    .flatMap(([_, v]) => v);

  const random = Array.from({ length: 3 }, () => pickRandom(allowed));

  return random;
};

export const fillDefVals = ({
  min,
  max,
  u,
  store,
}: {
  min: number;
  max: number;
  u: UserInstance;
  store: BookStoreInstance;
}) => ({
  bookStoreID: store!.id,
  description: doLorem(20),
  year: makeRandomMinMax(min, max).toFixed(0),
  price: makeRandomMinMax(1, 50).toFixed(2),
  qty: makeRandomMinMax(1, 50).toFixed(0),
  createdBy: u.email,
  lastUpdatedBy: u.email,
  categories: getValidCat(store!.categories),
});

type AssetsReturn = Awaited<ReturnType<typeof createBooksAssets>>;

export const generateBooks = async ({
  uploaded,
  images,
  t,
  u,
  store,
}: AssetsReturn & {
  t: Transaction;
  u: UserInstance;
  store: BookStoreInstance;
}) => {
  let i = 0;

  while (i < uploaded.length) {
    await Book.create(
      {
        title: images[i].title,
        author: images[i].auth,
        ...fillDefVals({ min: 1800, max: 1950, u, store: store! }),
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
};

export const generateJunction = async ({
  email,
  tyler,
  store,
  t,
}: {
  email: string;
  tyler: UserInstance;
  store: BookStoreInstance;
  t: Transaction;
}) => {
  const obj = {
    "jane@gmail.com": UserRole.MANAGER,
    "john@gmail.com": UserRole.EMPLOYEE,
  };

  await BookStoreUser.create(
    {
      userID: tyler!.id,
      bookStoreID: store!.id,
      userEmail: tyler!.email,
      role: obj[email as keyof typeof obj],
    },
    { transaction: t }
  );
};
