import { calcTimeRun } from "../lib/utils/utils.js";
import { cloud } from "../config/cloud.js";
import { seq, syncDB } from "../config/db.js";
import { populateDB } from "./populateDB.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    try {
      await cloud.api.delete_resources_by_prefix("pern__", {
        resource_type: "image",
      });

      await cloud.api.delete_resources_by_prefix("pern__", {
        resource_type: "video",
      });

      await seq.sync({ force: true });

      await populateDB();
    } catch (err) {}
  });
};
