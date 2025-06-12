import { literal, Op, where, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";
import { parseArrFromStr } from "../../../dataStructures.js";
import { findVal } from "../../../utils/formatters.js";

export const makeQueryOrdersOwner = (req: ReqApp) => {
  const { userID } = req;
  const q = req.query ?? {};

  const queryOrders: WhereOptions = {};
  const queryStoreOrders: WhereOptions = {};
  const queryBookStore: WhereOptions = {
    ownerID: userID,
  };
  const queryAfterPipe: any = {};

  for (const k in q) {
    const v = q[k];

    switch (k) {
      case "ID":
        queryStoreOrders.id = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "bookStoreID":
        queryStoreOrders.bookStoreID = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "bookStoreName":
        queryBookStore.name = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "categories": {
        const parsed = parseArrFromStr(v as string | string[]);

        queryBookStore.categories = {
          [Op.contains]: parsed,
        };

        break;
      }

      case "stage": {
        const parsed = parseArrFromStr(v as string | string[]);

        queryStoreOrders.stage = {
          [Op.in]: parsed,
        };
        break;
      }

      case "delivery": {
        const cond: WhereOptions = [];
        const parsed = parseArrFromStr(v as string | string[]);

        if (findVal(parsed, "free_delivery"))
          cond.push({ delivery: { [Op.lte]: 0 } });
        if (findVal(parsed, "delivery_charged"))
          cond.push({ delivery: { [Op.gt]: 0 } });

        queryStoreOrders[Op.or as any] = [
          ...(queryStoreOrders[Op.or as any] ?? []),
          ...cond,
        ];

        break;
      }

      case "minPrice": {
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(
            `SUM("OrderStore"."amount" + "OrderStore"."delivery") >= ${v}`
          ),
        ];

        break;
      }

      case "maxPrice": {
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(
            `SUM("OrderStore"."amount" + "OrderStore"."delivery") <= ${v}`
          ),
        ];

        break;
      }

      case "minQty": {
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`(
            SELECT SUM(oi.qty)
            FROM "order_items" AS oi
            WHERE oi."orderStoreID" = "OrderStore"."id"
            ) >= ${v}`),
        ];

        break;
      }
      case "maxQty": {
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`(
            SELECT SUM(oi.qty)
            FROM "order_items" AS oi
            WHERE oi."orderStoreID" = "OrderStore"."id"
            ) <= ${v}`),
        ];

        break;
      }

      default:
        break;
    }
  }

  return {
    queryOrders,
    queryStoreOrders,
    queryBookStore,
    queryAfterPipe,
  };
};
