import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import fs from "fs";
import { uploadVideoCloud } from "../../lib/cloud/video.js";
import { uploadImdDisk } from "../../lib/cloud/imagesDisk.js";
import { delCloud } from "../../lib/cloud/delete.js";
import { err500 } from "../../lib/responseClient/err.js";

export const createBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const images = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.images;
  const video = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.video;

  if (video?.[0]) {
    if (video?.[0]) await uploadVideoCloud(video?.[0]);

    try {
      await fs.promises.unlink(video[0].path);
    } catch (err) {
      console.log("fail delete video file", err);
    }
  }

  const imagesData: any[] = [];

  try {
    let i = 0;
    do {
      const curr = images[i];
      const dataImg = await uploadImdDisk(curr, "book_store");
      imagesData.push(dataImg);

      i++;
    } while (i < images.length);
  } catch (err) {
    console.log(err);
    if (imagesData.length)
      await Promise.all(
        imagesData.map(async (img) => await delCloud(img.publicID))
      );

    return err500(res);
  } finally {
    try {
      await Promise.all(
        images.map(async (img) => await fs.promises.unlink(img.path))
      );
    } catch (err) {
      console.log("err delete images locally", err);
    }
  }

  return res200(res);
};
