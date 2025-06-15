import { literal, Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { parseArrFromStr } from "../../dataStructures.js";
import { addPropQuery } from "../../utils/utils.js";

export const makeQueryOrdersConsumer = (req: ReqApp) => {
  const { userID } = req;

  const queryOrders: WhereOptions = {
    userID,
  };

  const queryAfterPipe: WhereOptions = {};

  const q = req.query;
  for (const k in q) {
    const v = q[k];

    switch (k) {
      case "ID":
        queryOrders.id = v;
        break;

      case "stage":
        queryOrders.stage = {
          [Op.in]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "minPrice": {
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`
              SUM ("Order".amount - "Order".discount) >= ${v}
              `),
        ];

        break;
      }

      case "maxPrice": {
        queryAfterPipe[Op.and as any] = [
          ...(queryAfterPipe[Op.and as any] ?? []),
          literal(`
              SUM ("Order".amount - "Order".discount) <= ${v}
              `),
        ];

        break;
      }

      case "minQty":
        addPropQuery(
          queryAfterPipe,
          Op.and as any
        )(
          literal(`(
            SELECT SUM(oi.qty)
            FROM "orders_stores" AS os
            INNER JOIN "order_items" AS oi ON os.id = oi."orderStoreID"
            WHERE os."orderID" = "Order"."id"
            ) >= ${v}`)
        );
        break;

      case "maxQty":
        addPropQuery(
          queryAfterPipe,
          Op.and as any
        )(
          literal(`(
            SELECT SUM(oi.qty)
            FROM "orders_stores" AS os
            INNER JOIN "order_items" AS oi ON os.id = oi."orderStoreID"
            WHERE os."orderID" = "Order"."id"
            ) <= ${v}`)
        );
        break;
        k;

      default:
        break;
    }
  }

  return { queryOrders, queryAfterPipe };
};
