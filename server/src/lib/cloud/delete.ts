import { cloud } from "../../config/cloud.js";
import { __cg } from "../utils/log.js";

export enum ResourceType {
  IMG = "image",
  VID = "video",
}

export const delCloud = async (publicID: string, resource?: ResourceType) => {
  try {
    const res = await cloud.uploader.destroy(publicID, {
      resource_type: resource ?? "image",
      invalidate: true,
    });

    __cg("res deletion", res);
  } catch (err) {
    __cg("err cloud", err);
  }
};

export const delArrCloud = async (
  publicIDs: string[],
  resource?: ResourceType
) => {
  if (!publicIDs?.length) return;

  try {
    const res = await cloud.api.delete_resources(publicIDs, {
      resource_type: resource ?? "image",
      invalidate: true,
    });

    __cg("res deletion", res);
  } catch (err) {
    __cg("err cloud", err);
  }
};
