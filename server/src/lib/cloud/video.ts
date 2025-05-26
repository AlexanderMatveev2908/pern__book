import { cloud } from "../../config/cloud.js";

export const uploadVideoCloud = async (file: Express.Multer.File) => {
  if (!file) throw new Error("No file provided");

  const res = await cloud.uploader.upload(file.path, {
    resource_type: "video",
    folder: "pern__book_videos",
  });
  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
