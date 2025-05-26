import { BookInstance } from "../../../models/all/Book.js";
import { CloudImg } from "../../../types/all/cloud.js";
import { ReqApp } from "../../../types/types.js";
import { uploadCloudMemory } from "../../cloud/imagesMemory.js";
import { getCloudID } from "../../utils/ids.js";

export const handleAssetsBooksPut = async ({
  req,
  uploadedNow,
  toDeleteIds,
  bookObj,
}: {
  req: ReqApp;
  uploadedNow: CloudImg[];
  toDeleteIds: string[];
  bookObj: BookInstance;
}) => {
  const { body } = req;
  const files = req.files as Express.Multer.File[];
  const existingImages = bookObj.images?.length ? [...bookObj.images] : [];

  if (files.length) {
    const uploaded = await Promise.all(
      files.map((f) => uploadCloudMemory(f, "books"))
    );
    uploadedNow.push(...uploaded);
    bookObj.images = uploadedNow;
  }

  if (uploadedNow.length) {
    toDeleteIds.push(...existingImages.map((el) => el.publicID));
  }

  if (!uploadedNow.length && existingImages?.length) {
    const newIds = !body.images?.length
      ? null
      : new Set(body.images.map((url: string) => getCloudID(url)));

    if (newIds instanceof Set) {
      for (const img of existingImages) {
        if (!newIds.has(img.publicID)) toDeleteIds.push(img.publicID);
      }
    } else {
      toDeleteIds.push(...existingImages.map((el) => el.publicID));
    }

    bookObj.images = existingImages.filter(
      (img) => !toDeleteIds.includes(img.publicID)
    );
  }
};
