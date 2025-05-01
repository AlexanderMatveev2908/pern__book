import { v2 as cloud } from "cloudinary";

export const uploadThumb = async (file: Express.Multer.File) => {
  if (!file?.buffer || !file?.mimetype.startsWith("image"))
    throw new Error("Invalid file type");

  const b64 = file.buffer.toString("base64");
  const data = `data:${file.mimetype};base64,${b64}`;

  const res = await cloud.uploader.upload(data, {
    resource_type: "image",
    folder: "pern__book_thumbs",
  });

  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
