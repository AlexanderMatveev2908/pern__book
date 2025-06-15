import { fileURLToPath } from "url";
import { cloud } from "../../config/cloud.js";
import path from "path";
import fs from "fs/promises";
import { captAll } from "../../lib/utils/formatters.js";
import { Book } from "../../models/all/Book.js";
import { fillDefVals } from "./data.js";
import { Transaction } from "sequelize";
import { UserInstance } from "../../models/all/User.js";
import { BookStoreInstance } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { UserRole } from "../../types/types.js";

export const getAssetsPath = (frag: string) =>
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
    `./assets_dev/${frag}`
  );

export const createBooksAssets = async (authIn: string[]) => {
  const booksDir = getAssetsPath("books");

  const images: { path: string; auth: string; title: string }[] = [];

  const authors = await fs.readdir(booksDir);

  for (const a of authors) {
    if (!authIn?.includes(a)) continue;

    const authorDir = path.join(booksDir, a);
    const stat = await fs.stat(authorDir);

    if (!stat.isDirectory()) continue;

    const imgDirs = await fs.readdir(authorDir);

    for (const imgD of imgDirs) {
      const fullPathImg = path.join(authorDir, imgD);

      images.push({
        path: fullPathImg,
        auth: captAll(a.split("_").join(" ")),
        title: captAll(imgD.split(".")[0].split("_").join(" ")),
      });
    }
  }

  const uploaded = await Promise.all(
    images.map(async (img) => {
      const res = await cloud.uploader.upload(img.path, {
        resource_type: "image",
        folder: "pern__book_books",
      });
      return {
        url: res.secure_url,
        publicID: res.public_id,
      };
    })
  );

  return {
    images,
    uploaded,
  };
};

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
        ...fillDefVals({ min: 1800, max: 150, u, store: store! }),
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
