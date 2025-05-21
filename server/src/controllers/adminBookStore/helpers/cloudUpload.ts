import { delCloud } from "../../../lib/cloud/delete.js";
import { uploadImdDisk } from "../../../lib/cloud/imagesDisk.js";
import { uploadVideoCloud } from "../../../lib/cloud/video.js";
import { ImgBookStoreType } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStoreType } from "../../../models/all/img&video/VideoBookStore.js";
import fs from "fs";
import { ReqApp } from "../../../types/types.js";

export const clearUnnecessary = async (
  videoData: Partial<VideoBookStoreType> | null,
  imagesData: Partial<ImgBookStoreType>[]
) => {
  if (videoData) await delCloud(videoData.publicID!);
  if (imagesData.length)
    await Promise.all(
      imagesData.map(async (img) => await delCloud(img.publicID!))
    );

  return null;
};

export const handleAssetsCloud = async (req: ReqApp) => {
  const images = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.images;
  const video = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.video;

  let videoData: Partial<VideoBookStoreType> | null = null;

  if (video?.[0]) {
    if (video?.[0]) videoData = await uploadVideoCloud(video?.[0]);

    try {
      await fs.promises.unlink(video[0].path);
    } catch (err) {
      console.log("fail delete video file", err);
    }
  }

  const imagesData: Partial<ImgBookStoreType>[] = [];

  if (images?.length) {
    try {
      let i = 0;
      do {
        const curr = images[i];
        const dataImg = await uploadImdDisk(curr, "pern__book_stores");
        imagesData.push(dataImg);

        i++;
      } while (i < images.length);
    } catch (err) {
      console.log("fail upload all images", err);
      await clearUnnecessary(videoData, imagesData);

      throw err;
    } finally {
      try {
        await Promise.all(
          images.map(async (img) => await fs.promises.unlink(img.path))
        );
      } catch (err) {
        console.log("err delete images locally", err);
      }
    }
  }

  return { videoData, imagesData };
};
