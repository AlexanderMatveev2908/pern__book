import { FindOptions, literal, Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";
import { parseArrFromStr } from "../../../dataStructures.js";
import { handleQueryDelivery } from "../../general.js";

export const queryStoresWorker = (req: ReqApp) => {
  const queryStores: WhereOptions = {};
  const queryAfterPipe: any = {};
  const queryOrders: WhereOptions = {};

  for (const pair of Object.entries(req.query ?? {})) {
    const [k, v] = pair;

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

      case "delivery": {
        const { deliveryConditions } = handleQueryDelivery(
          v as string | string[]
        );

        if (deliveryConditions.length)
          queryStores[Op.or as any] = [
            ...(queryStores[Op.or as any] ?? []),
            ...deliveryConditions,
          ];

        break;
      }

      case "orders":
        queryOrders.stage = {
          [Op.in]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "avgRating": {
        const cond: WhereOptions = [];
        for (const pair of parseArrFromStr(v as string | string[])) {
          const [from, to] = pair.split("-");

          cond.push(
            literal(`( 
            SELECT ROUND(COALESCE(AVG(r.rating),0),1)
            FROM "book_stores" as bs
            INNER JOIN "books" as b ON bs.id = b."bookStoreID"
            INNER JOIN "reviews" as r ON b.id = r."bookID"
            WHERE bs."id" = "BookStoreUser"."bookStoreID"
            )
              BETWEEN ${from} AND ${to}
              `)
          );
        }

        if (cond.length)
          queryAfterPipe[Op.or as any] = [
            ...(queryAfterPipe[Op.or as any] ?? []),
            ...cond,
          ];

        break;
      }

      case "minAvgPrice":
        queryAfterPipe[Op.or as any] = [
          ...(queryAfterPipe[Op.or as any] ?? []),
          literal(`(
            SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
            FROM "book_stores" as bs 
            INNER JOIN "books" as b ON bs.id = b."bookStoreID"
            WHERE bs."id" = "BookStoreUser"."bookStoreID"
            ) >= ${v}`),
        ];
        break;

      case "maxAvgPrice":
        queryAfterPipe[Op.or as any] = [
          ...(queryAfterPipe[Op.or as any] ?? []),
          literal(`(
              SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
              FROM "book_stores" as bs 
              INNER JOIN "books" as b ON bs.id = b."bookStoreID"
              WHERE bs."id" = "BookStoreUser"."bookStoreID"
              ) <= ${v}`),
        ];
        break;

      case "minAvgQty":
        queryAfterPipe[Op.or as any] = [
          ...(queryAfterPipe[Op.or as any] ?? []),
          literal(`(
            SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
            FROM "book_stores" as bs
            INNER JOIN "books" as b ON bs.id = b."bookStoreID"
            WHERE bs.id = "BookStoreUser"."bookStoreID" 
            ) >= ${v}`),
        ];
        break;

      case "maxAvgQty":
        queryAfterPipe[Op.or as any] = [
          ...(queryAfterPipe[Op.or as any] ?? []),
          literal(`(
                SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
                FROM "book_stores" as bs
                INNER JOIN "books" as b ON bs.id = b."bookStoreID"
                WHERE bs.id = "BookStoreUser"."bookStoreID" 
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
