import { v2 as cloud } from "cloudinary";
import { __cg } from "../../middleware/general/logger.js";

export const delCloud = async (publicID: string) => {
  try {
    await cloud.uploader.destroy(publicID);
  } catch (err) {
    __cg("err cloud", err);
  }
};
