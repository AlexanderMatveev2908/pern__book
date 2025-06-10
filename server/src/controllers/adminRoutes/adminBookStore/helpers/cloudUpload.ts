import {
  delArrCloud,
  delCloud,
  ResourceType,
} from "../../../../lib/cloud/delete.js";
import { uploadVideoCloud } from "../../../../lib/cloud/video.js";
import { __cg } from "../../../../lib/utils/log.js";
import { ImgBookStoreType } from "../../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStoreType } from "../../../../models/all/img&video/VideoBookStore.js";
import fs from "fs";
import { ReqApp } from "../../../../types/types.js";
import { uploadImdDisk } from "../../../../lib/cloud/imagesDisk.js";

export const clearUnnecessary = async (
  videoData: Partial<VideoBookStoreType> | null,
  imagesData: Partial<ImgBookStoreType>[]
) => {
  if (videoData) await delCloud(videoData.publicID!, ResourceType.VID);
  if (imagesData.length)
    await delArrCloud(imagesData.map((img) => img.publicID!));
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
      __cg("fail delete video file", err);
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
      await clearUnnecessary(videoData, imagesData);

      throw err;
    } finally {
      try {
        await Promise.all(
          images.map(async (img) => await fs.promises.unlink(img.path))
        );
      } catch (err) {
        __cg("err delete images locally", err);
      }
    }
  }

  return { videoData, imagesData };
};
