import { Op } from "sequelize";
import { ReqApp } from "../../../types/types.js";

export const createStoreQ = (req: ReqApp) => {
  const {
    ID,
    categories,
    orders,
    delivery,
    avgRating,
    minAvgPrice,
    maxAvgPrice,
    minAvgQty,
    maxAvgQty,
    managers,
    employees,
    workers,
  } = req.query;
  const { userID } = req;

  const query: { [key: string]: unknown } = {
    ownerID: userID,
  };

  if (!Object.keys(req.query ?? {}).length) return query;

  for (const key in req.query) {
    const val = req.query[key];
    if (
      (typeof val == "string" && !val.trim().length) ||
      (Array.isArray(val) && !val.length)
    )
      continue;

    if (["name", "country", "state", "city"].includes(key))
      query[key] = {
        [Op.iLike]: `%${val}%`,
      };

    if (key === "ID") query.id = val;

    if (key === "categories") {
      query.categories = {
        [Op.overlap]: Array.isArray(val) ? val : [val],
        // [Op.contains]: Array.isArray(val) ? val : [val],
      };
    }
  }

  return query;
};
