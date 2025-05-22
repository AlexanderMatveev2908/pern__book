import { v2 } from "cloudinary";

export const uploadImdDisk = async (
  file: Express.Multer.File,
  folder: string
) => {
  if (!file) throw new Error("No file provided");

  const res = await v2.uploader.upload(file.path, {
    resource_type: "image",
    folder,
  });
  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
