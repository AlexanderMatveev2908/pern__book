import { calcTimeRun } from "../lib/utils/utils.js";
import { cloud } from "../config/cloud.js";
import { seq } from "../config/db.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    try {
      await cloud.api.delete_resources_by_prefix("pern__", {
        resource_type: "image",
      });

      await cloud.api.delete_resources_by_prefix("pern__", {
        resource_type: "video",
      });

      await seq.drop({ cascade: true });
    } catch (err) {}
  });
};
