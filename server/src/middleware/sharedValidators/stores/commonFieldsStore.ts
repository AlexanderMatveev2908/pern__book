import { check } from "express-validator";
import {
  REG_CLOUD,
  REG_PRICE,
  REG_STORE_DESC,
  REG_STORE_NAME,
} from "../../../config/regex.js";
import { allOrNothingStr } from "../../../lib/dataStructures.js";

const MAX_MB_IMG = 1024 * 1024 * 5;
// ? COULD BE TOO MUCH FOR HOST PLATFORM SO SERVER COULD EASILY CRASH
const MAX_MB_VID = 1024 * 1024 * 50;

export const checkStoreName = () =>
  check("bookStoreName").custom((val) =>
    allOrNothingStr(REG_STORE_NAME, val)
      ? true
      : Promise.reject("Invalid store name")
  );

export const validateCommonFieldsStorePut = (req: any) => {
  const images = req.files?.images as Express.Multer.File[] | undefined;
  if (images?.length) {
    let i = 0;

    do {
      const curr = images[i] as Express.Multer.File;

      if (!curr.mimetype.startsWith("image"))
        throw new Error("Invalid image type");
      if (curr.size > MAX_MB_IMG)
        throw new Error(`Image ${curr.originalname} is too large 😠`);

      i++;
    } while (i < images.length);
  }
  const video = req.files?.video as Express.Multer.File[] | undefined;

  if (video?.length) {
    // * ALSO UNIQUE
    const curr = video[0];

    if (!curr.mimetype.startsWith("video"))
      throw new Error("Invalid video type");
    if (curr.size > MAX_MB_VID)
      throw new Error(`Video ${curr.originalname} is too large 😠`);
  }

  const urlsImages = req.body?.images;
  if (Array.isArray(urlsImages)) {
    if (urlsImages?.length && urlsImages?.some((url) => !REG_CLOUD.test(url)))
      throw new Error("Invalid url images");
    if (urlsImages?.length > 5) throw new Error("Too much images");
  }
  const urlVideo = req.body?.video;
  if (Array.isArray(urlVideo) && urlVideo?.length > 1)
    throw new Error("Too much video");
  if (
    typeof urlVideo === "string" &&
    urlVideo.length &&
    !REG_CLOUD.test(urlVideo)
  )
    throw new Error("Invalid url video");
};

export const validateCommonFieldsStoreTxt = [
  check("description").custom((val) => {
    if (!val?.length) return true;

    if (val.length > 12000) throw new Error("Description too long");
    if (!REG_STORE_DESC.test(val)) throw new Error("Invalid description chars");

    return true;
  }),

  check("deliveryPrice").custom((val) =>
    !val?.length || (REG_PRICE.test(val) && +val >= 0.01)
      ? true
      : Promise.reject("Invalid price")
  ),

  check("freeDeliveryAmount").custom((val) =>
    !val?.length || (REG_PRICE.test(val) && +val >= 0.01)
      ? true
      : Promise.reject("Invalid free delivery amount")
  ),

  check("deliveryTime")
    .toInt()
    .isInt()
    .withMessage("Invalid delivery time")
    .custom((val) => (+val ? true : Promise.reject("Invalid delivery time"))),
];
