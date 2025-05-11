import { literal, Op, QueryOptions, WhereOptions } from "sequelize";
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
  const queryAfterPipe: any = {};

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

    if (k === "avgRating") {
      const cond: WhereOptions = [];

      if (Array.isArray(val) && val.length) {
        for (const opt of val) {
          if (typeof opt !== "string") continue;
          const pair = opt.split("-");

          cond.push(
            literal(
              `COALESCE(AVG(reviews.rating), 0) BETWEEN ${pair[0]} AND ${pair[1]}`
            )
          );
        }
      } else {
        if (typeof val !== "string") continue;

        const pair = val.split("-");

        cond.push(
          literal(
            `COALESCE(AVG(reviews.rating), 0) BETWEEN ${pair[0]} AND ${pair[1]}`
          )
        );
      }

      if (cond.length) queryAfterPipe[Op.or as any] = cond;
    }

    if (k === "minAvgPrice")
      queryAfterPipe[Op.and] = [
        ...(queryAfterPipe?.[Op.and] ?? []),
        literal(`COALESCE(AVG(books.price), 0) >= ${val}`),
      ];
    if (k === "maxAvgPrice")
      queryAfterPipe[Op.and] = [
        ...(queryAfterPipe[Op.and] ?? []),
        literal(`COALESCE(AVG(books.price), 0) <= ${val}`),
      ];

    if (k === "minAvgQty") {
      const cond = literal(`COALESCE(AVG(books.qty), 0)  >= ${val}`);

      if (queryAfterPipe[Op.and]?.length) queryAfterPipe[Op.and].push(cond);
      else queryAfterPipe[Op.and] = [cond];
    }
    if (k === "maxAvgQty") {
      const cond = literal(`COALESCE(AVG(books.qty), 0) <= ${val}`);
      queryAfterPipe[Op.and] = queryAfterPipe[Op.and]?.length
        ? [...queryAfterPipe[Op.and], cond]
        : [cond];
    }

    if (k === "workers")
      queryAfterPipe[Op.and] = [
        ...(queryAfterPipe?.[Op.and] ?? []),
        literal(`COALESCE(COUNT("workers"."id"), 0) >= ${val}`),
      ];
  }

  return { queryStore, queryOrders, queryAfterPipe };
};
