import { v2 } from "cloudinary";

export const uploadVideoCloud = async (file: Express.Multer.File) => {
  if (!file) throw new Error("No file provided");

  const res = await v2.uploader.upload(file.path, {
    resource_type: "video",
    folder: "videos",
  });
  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
