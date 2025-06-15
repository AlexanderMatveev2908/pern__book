import fs from "fs/promises";
import { getAssetsPath, pickRandom } from "./helpers.js";
import path from "path";
import { captAll } from "../../lib/utils/formatters.js";
import { cloud } from "../../config/cloud.js";

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

export const generateStoresAssets = async (name: string) => {
  const storesDirs = getAssetsPath("libraries");

  const images: { path: string }[] = [];

  const stores = await fs.readdir(storesDirs);

  for (const s of stores) {
    if (!name?.includes(s)) continue;

    const storeDir = path.join(storesDirs, s);
    const stat = await fs.stat(storeDir);

    if (!stat.isDirectory()) continue;

    const imgDirs = await fs.readdir(storeDir);

    for (const imgD of imgDirs) {
      const fullPathImg = path.join(storeDir, imgD);

      images.push({
        path: fullPathImg,
      });
    }
  }

  const uploaded = await Promise.all(
    images.map(async (img) => {
      const res = await cloud.uploader.upload(img.path, {
        resource_type: "image",
        folder: "pern__book_stores",
      });
      return {
        url: res.secure_url,
        publicID: res.public_id,
      };
    })
  );

  return {
    uploaded,
  };
};

export const generateVideoStores = async () => {
  const videosDir = getAssetsPath("video");

  const videoArg: { path: string }[] = [];

  const assets = await fs.readdir(videosDir);

  for (const v of assets) {
    const fullPath = path.join(videosDir, v);

    videoArg.push({
      path: fullPath,
    });
  }

  const choice = pickRandom(videoArg);

  const uploaded = await cloud.uploader.upload(choice.path, {
    resource_type: "video",
    folder: "pern__book_videos",
  });

  return {
    url: uploaded.secure_url,
    publicID: uploaded.public_id,
  };
};
