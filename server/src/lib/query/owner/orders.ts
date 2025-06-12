import { literal, Op, where, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { parseArrFromStr } from "../../dataStructures.js";
import { findVal } from "../../utils/formatters.js";
import { handleQueryDelivery } from "../general/general.js";

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
        handleQueryDelivery({
          val: v as string | string[],
          query: queryStoreOrders,
          key: "delivery",
        });

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
