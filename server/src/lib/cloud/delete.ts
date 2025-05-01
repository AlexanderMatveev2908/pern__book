import { v2 as cloud } from "cloudinary";
import { __cg } from "../utils/log.js";

export enum ResourceType {
  IMG = "image",
  VID = "video",
}

export const delCloud = async (publicID: string, resource?: ResourceType) => {
  try {
    const res = await cloud.uploader.destroy(publicID, {
      resource_type: resource ?? "image",
    });

    __cg("res deletion", res);
  } catch (err) {
    __cg("err cloud", err);
  }
};
