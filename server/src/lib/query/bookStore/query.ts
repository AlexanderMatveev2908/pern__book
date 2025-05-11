import { literal, Op, WhereOptions } from "sequelize";
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

  const queryStore: WhereOptions = {
    ownerID: userID,
  };
  const queryOrders: WhereOptions = {};
  const queryReviews: WhereOptions = {};

  if (!Object.keys(q ?? {}).length) return queryStore;

  for (const k in q) {
    const val = q[k];
    if (
      (typeof val == "string" && !val.trim().length) ||
      (Array.isArray(val) && !val.length)
    )
      continue;

    if (["name", "country", "state", "city"].includes(k))
      queryStore[k] = {
        [Op.iLike]: `%${val}%`,
      };

    if (k === "ID") queryStore.id = val;

    if (k === "categories")
      queryStore.categories = {
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

      if (cond.length) queryStore[Op.or as any] = cond;
    }

    if (k === "orders")
      queryOrders.stage = {
        [Op.in]: Array.isArray(val) ? val : [val],
      };
  }

  return { queryStore, queryOrders };
};
