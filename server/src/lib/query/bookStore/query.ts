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

  const query: any = {
    ownerID: userID,
  };

  if (Object.keys(req.query ?? {}).length) {
    for (const key in req.query) {
      const val = req.query[key];
      if (!val || (Array.isArray(val) && !val.length)) continue;

      if (["name", "country", "state", "city"].includes(key))
        query[key] = {
          [Op.iLike]: `%${val}%`,
        };
    }
  }

  return query;
};
