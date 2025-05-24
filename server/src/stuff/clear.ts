import { calcTimeRun } from "../lib/utils/utils.js";
import { cloud } from "../config/cloud.js";
import { seq } from "../config/db.js";

export const clearDB = async () => {
  calcTimeRun(async () => {
    try {
      const res = await cloud.api.sub_folders("");

      const toDel = res.folders
        .filter((f: any) => (f.name as string).startsWith("pern__"))
        .map((f: any) => f.path);

      await Promise.all(
        toDel.map(async (p: string) =>
          cloud.api.delete_folder(p, {
            resource_type: p.includes("video") ? "video" : "image",
          })
        )
      );

      await seq.drop({ cascade: true });
    } catch (err) {
      console.log(err);
    }
  });
};
