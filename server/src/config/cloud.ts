import { v2 } from "cloudinary";
import { isDev } from "./env.js";

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: !isDev,
});

export const cloud = v2;
