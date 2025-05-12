import { literal, Op, QueryOptions, WhereOptions } from "sequelize";
import { ReqApp, UserRole } from "../../../types/types.js";

const makeRoleSql = (
  role: UserRole,
  val: number | string
) => `(SELECT COALESCE(COUNT(DISTINCT "book_stores_users"."userID"), 0)
             FROM "book_stores_users" WHERE "book_stores_users"."bookStoreID"="BookStore"."id"
              AND "book_stores_users"."role"= '${role}'
              ) >= ${val || 0}`;

export const createStoreQ = (req: ReqApp) => {
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

    switch (k) {
      case "name":
      case "country":
      case "state":
      case "city":
        queryStore[k] = {
          [Op.iLike]: `%${val}%`,
        };
        break;

      case "ID":
        queryStore.id = val;
        break;

      case "categories":
        queryStore.categories = {
          [Op.overlap]: Array.isArray(val) ? val : [val],
        };
        break;

      case "delivery": {
        const deliveryConditions: WhereOptions = [];
        if (
          (Array.isArray(val) && val.includes("free_delivery")) ||
          val === "free_delivery"
        )
          deliveryConditions.push({
            deliveryPrice: {
              [Op.lte]: 0,
            },
          });

        if (
          (Array.isArray(val) && val.includes("delivery_charged")) ||
          val === "delivery_charged"
        )
          deliveryConditions.push({
            deliveryPrice: {
              [Op.gt]: 0,
            },
          });

        if (deliveryConditions.length)
          queryStore[Op.or as any] = deliveryConditions;

        break;
      }

      case "orders":
        queryOrders.stage = {
          [Op.in]: Array.isArray(val) ? val : [val],
        };
        break;

      case "avgRating": {
        const ratingConditions = [];
        if (Array.isArray(val) && val.length) {
          for (const opt of val) {
            if (typeof opt !== "string") continue;
            const pair = opt.split("-");
            ratingConditions.push(
              literal(
                `COALESCE(AVG(reviews.rating), 0) BETWEEN ${pair[0]} AND ${pair[1]}`
              )
            );
          }
        } else {
          if (typeof val !== "string") continue;
          const pair = val.split("-");
          ratingConditions.push(
            literal(
              `COALESCE(AVG(reviews.rating), 0) BETWEEN ${pair[0]} AND ${pair[1]}`
            )
          );
        }
        if (ratingConditions.length) queryAfterPipe[Op.or] = ratingConditions;
        break;
      }

      case "minAvgPrice":
        queryAfterPipe[Op.and] = [
          ...(queryAfterPipe?.[Op.and] ?? []),
          literal(`COALESCE(AVG(books.price), 0) >= ${val}`),
        ];
        break;

      case "maxAvgPrice":
        queryAfterPipe[Op.and] = [
          ...(queryAfterPipe[Op.and] ?? []),
          literal(`COALESCE(AVG(books.price), 0) <= ${val}`),
        ];
        break;

      case "minAvgQty": {
        const minQtyCond = literal(`COALESCE(AVG(books.qty), 0)  >= ${val}`);
        queryAfterPipe[Op.and] = queryAfterPipe[Op.and]
          ? [...queryAfterPipe[Op.and], minQtyCond]
          : [minQtyCond];
        break;
      }

      case "maxAvgQty": {
        const maxQtyCond = literal(`COALESCE(AVG(books.qty), 0) <= ${val}`);
        queryAfterPipe[Op.and] = queryAfterPipe[Op.and]
          ? [...queryAfterPipe[Op.and], maxQtyCond]
          : [maxQtyCond];
        break;
      }

      case "workers":
        queryAfterPipe[Op.and] = [
          ...(queryAfterPipe?.[Op.and] ?? []),
          literal(
            `(
            SELECT COALESCE(COUNT(DISTINCT "book_stores_users"."userID"), 0)
            FROM "book_stores_users"
            WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
            ) >= ${val}`
          ),
        ];
        break;

      case "managers":
        queryAfterPipe[Op.and] = [
          ...(queryAfterPipe?.[Op.and] ?? []),
          literal(makeRoleSql(UserRole.MANAGER, +val!)),
        ];

      case "employees":
        queryAfterPipe[Op.and] = [
          ...(queryAfterPipe?.[Op.and] ?? []),
          literal(makeRoleSql(UserRole.EMPLOYEE, +val!)),
        ];
        break;

      default:
        break;
    }
  }

  return { queryStore, queryOrders, queryAfterPipe };
};
