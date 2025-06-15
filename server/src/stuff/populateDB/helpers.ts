import { fileURLToPath } from "url";
import { cloud } from "../../config/cloud.js";
import path from "path";
import fs from "fs/promises";
import { captAll } from "../../lib/utils/formatters.js";

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
