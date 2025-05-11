import { literal, Op } from "sequelize";
import { ReqApp } from "../../../types/types.js";

export const createStoreQ = (req: ReqApp) => {
  // const {
  //   ID,
  //   categories,
  //   orders,
  //   delivery,
  //   avgRating,
  //   minAvgPrice,
  //   maxAvgPrice,
  //   minAvgQty,
  //   maxAvgQty,
  //   managers,
  //   employees,
  //   workers,
  // } = req.query;
  const q = req.query;
  const { userID } = req;

  const query: { [key: string]: unknown } = {
    ownerID: userID,
  };

  if (!Object.keys(q ?? {}).length) return query;

  for (const k in q) {
    const val = req.query[k];
    if (
      (typeof val == "string" && !val.trim().length) ||
      (Array.isArray(val) && !val.length)
    )
      continue;

    if (["name", "country", "state", "city"].includes(k))
      query[k] = {
        [Op.iLike]: `%${val}%`,
      };

    if (k === "ID") query.id = val;

    if (k === "categories")
      query.categories = {
        [Op.overlap]: Array.isArray(val) ? val : [val],
        // [Op.contains]: Array.isArray(val) ? val : [val],
      };

    if (k === "delivery") {
      const cond = [];

      if (
        (Array.isArray(val) && val.includes("free_delivery")) ||
        val === "free_delivery"
      )
        cond.push({
          deliveryPrice: {
            [Op.lte]: 0,
          },
        });
      if (
        (Array.isArray(val) && val.includes("delivery_charged")) ||
        val === "delivery_charged"
      )
        cond.push({
          deliveryPrice: {
            [Op.gt]: 0,
          },
        });

      if (cond.length) query[Op.or as any] = cond;
    }
  }

  return query;
};
