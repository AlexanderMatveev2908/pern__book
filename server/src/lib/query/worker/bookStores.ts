import { literal, Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { parseArrFromStr } from "../../dataStructures.js";
import { handleQueryDelivery } from "../general/general.js";

export const queryStoresWorker = (req: ReqApp) => {
  const queryStores: WhereOptions = {};
  const queryAfterPipe: any = {};
  const queryOrders: WhereOptions = {};

  for (const [k, v] of Object.entries(req.query ?? {})) {
    switch (k) {
      case "name":
      case "country":
      case "state":
      case "city":
        queryStores[k] = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "categories":
        queryStores.categories = {
          [Op.contains]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "delivery":
        handleQueryDelivery({
          val: v as string | string[],
          query: queryStores,
          key: "deliveryPrice",
        });
        break;

      case "orders":
        queryOrders.stage = {
          [Op.in]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "avgRating": {
        const cond: WhereOptions = [];
        for (const rangeStr of parseArrFromStr(v as string | string[])) {
          const [from, to] = rangeStr.split("-");

          cond.push(
            literal(`(
              SELECT ROUND(COALESCE(AVG(r.rating), 0), 1)
              FROM books AS b
              INNER JOIN reviews AS r ON b.id = r."bookID"
              WHERE b."bookStoreID" = "BookStore"."id"
            ) BETWEEN ${from} AND ${to}`)
          );
        }
        if (cond.length) {
          queryAfterPipe[Op.or as any] = [
            ...(queryAfterPipe[Op.or as any] ?? []),
            ...cond,
          ];
        }
        break;
      }

      case "minAvgPrice":
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`(
      SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
      FROM books AS b
      WHERE b."bookStoreID" = "BookStore"."id"
    ) >= ${v}`),
        ];
        break;

      case "maxAvgPrice":
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`(
      SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
      FROM books AS b
      WHERE b."bookStoreID" = "BookStore"."id"
    ) <= ${v}`),
        ];
        break;

      case "minAvgQty":
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`(
      SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
      FROM books AS b
      WHERE b."bookStoreID" = "BookStore"."id"
    ) >= ${v}`),
        ];
        break;

      case "maxAvgQty":
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`(
      SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
      FROM books AS b
      WHERE b."bookStoreID" = "BookStore"."id"
    ) <= ${v}`),
        ];
        break;

      default:
        break;
    }
  }

  return {
    queryStores,
    queryAfterPipe,
    queryOrders,
  };
};
