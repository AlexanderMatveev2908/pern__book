import { cloud } from "../../config/cloud.js";

export const uploadImdDisk = async (
  file: Express.Multer.File,
  folder: string
) => {
  if (!file) throw new Error("No file provided");

  const res = await cloud.uploader.upload(file.path, {
    resource_type: "image",
    folder,
  });
  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
