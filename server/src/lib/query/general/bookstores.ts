import { literal } from "sequelize";
import { countTo_5 } from "../../utils/utils.js";
import { replacePoint } from "../../dataStructures.js";
import { Literal } from "sequelize/lib/utils";
import { StoreOrderStage } from "../../../types/all/orders.js";
import { capChar } from "../../utils/formatters.js";
import { countOrdersSql } from "./general.js";

export const calcRatingSqlStores = (): [Literal, string][] => [
  [
    literal(`
      json_build_object(
        'reviewsCount', (
          SELECT COALESCE(COUNT(DISTINCT r.id), 0)
          FROM "books" AS b
          INNER JOIN "reviews" AS r ON b.id = r."bookID"
          WHERE b."bookStoreID" = "BookStore"."id"
          AND b."deletedAt" IS NULL
          AND r."deletedAt" IS NULL
        ),
        'avgRating', (
          SELECT TO_CHAR(ROUND(COALESCE(AVG(r.rating), 0), 1), 'FM0.0')
          FROM "books" AS b
          INNER JOIN "reviews" AS r ON b.id = r."bookID"
          WHERE b."bookStoreID" = "BookStore"."id"
          AND b."deletedAt" IS NULL
          AND r."deletedAt" IS NULL
        ),
        ${countTo_5()
          .map((el) => {
            const key = `reviews__${replacePoint(el[0])}__${replacePoint(
              el[1]
            )}`;

            return `'${key}', (
              SELECT COALESCE(COUNT(DISTINCT r.id), 0)
              FROM "books" AS b
              INNER JOIN "reviews" AS r ON b.id = r."bookID"
              WHERE b."bookStoreID" = "BookStore"."id"
                AND r.rating BETWEEN ${el[0]} AND ${el[1]}
                AND b."deletedAt" IS NULL
                AND r."deletedAt" IS NULL
            )`;
          })
          .join(",\n")}
      )
    `),
    "ratingStats",
  ],
];

export const countOrdersStores = (): [Literal, string][] => [
  [
    literal(`
      json_build_object(
      'ordersCount', (
        SELECT COALESCE(COUNT(DISTINCT o.id), 0)
        FROM "orders_stores" AS o
        WHERE o."bookStoreID" = "BookStore"."id"
        AND o."deletedAt" IS NULL
      ),
      ${Object.values(StoreOrderStage)
        .map((stage) => {
          const k = "orders" + capChar(stage) + capChar("count");
          const sql = countOrdersSql(stage);

          return `'${k}', ${sql.val}`;
        })
        .join(",\n")}
      )
      `),
    "ordersStats",
  ],
];

export const countStatsBooksFoStore = (): [Literal, string][] => [
  [
    literal(`
      json_build_object(
        'booksCount', (
          SELECT COALESCE(COUNT(DISTINCT b.id), 0)
          FROM "books" AS b
          WHERE b."bookStoreID" = "BookStore"."id"
          AND b."deletedAt" IS NULL
        ),
        'avgPrice', (
          SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
          FROM "books" AS b
          WHERE b."bookStoreID" = "BookStore"."id"
          AND b."deletedAt" IS NULL
        ),
        'avgQty', (
          SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
          FROM "books" AS b
          WHERE b."bookStoreID" = "BookStore"."id"
          AND b."deletedAt" IS NULL
        )
      )
      `),
    "booksStats",
  ],
];
