import { v2 as cloud } from "cloudinary";
import { isDev } from "./env.js";

export const connectCloud = async () =>
  await cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: !isDev,
  });
