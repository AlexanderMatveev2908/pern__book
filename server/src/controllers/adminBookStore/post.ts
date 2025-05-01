import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/responseClient/res.js";
import fs from "fs";

export const createBookStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const images = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.images;
  const video = (req?.files as { [fieldname: string]: Express.Multer.File[] })
    ?.video;
  if (images.length) {
    let i = 0;
    do {
      const curr = images[i];

      if (fs.existsSync(curr.path))
        await new Promise((res) => {
          fs.unlink(curr.path, res);
        });

      i++;
    } while (i < images.length);
  }

  if (fs.existsSync(video[0].path))
    await new Promise((res) => {
      fs.unlink(video[0].path, res);
    });

  return res200(res);
};
