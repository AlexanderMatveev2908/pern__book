import { v2 } from "cloudinary";

export const uploadCloudMemory = async (
  file: Express.Multer.File,
  folder: string
) => {
  if (!file?.buffer) throw new Error("No file provided");

  const b64 = file.buffer.toString("base64");
  const data = `data:${file.mimetype};base64,${b64}`;

  const res = await v2.uploader.upload(data, {
    resource_type: "image",
    folder: `pern__book_${folder}`,
  });

  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
