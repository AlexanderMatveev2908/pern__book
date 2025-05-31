import { literal, Op, WhereOptions } from "sequelize";
import { capChar, findVal } from "../utils/formatters.js";
import { countTo_5 } from "../utils/utils.js";
import { parseArrFromStr, replacePoint } from "../dataStructures.js";
import { Literal } from "sequelize/lib/utils";
import { OrderStage } from "../../types/all/orders.js";

export const handleQueryDelivery = (val: string | string[]) => {
  const deliveryConditions: WhereOptions = [];
  if (findVal(val, "free_delivery"))
    deliveryConditions.push({
      deliveryPrice: {
        [Op.lte]: 0,
      },
    });

  if (findVal(val, "delivery_charged"))
    deliveryConditions.push({
      deliveryPrice: {
        [Op.gt]: 0,
      },
    });

  return { deliveryConditions };
};

export const createCondRating = (v: string | string[]) => {
  const cond: WhereOptions = [];

  for (const pair of parseArrFromStr(v as string | string[])) {
    const [from, to] = pair.split("-");

    cond.push(
      literal(`(
              SELECT ROUND(COALESCE(AVG(r.rating), 0), 1)
              FROM reviews AS r
              WHERE r."bookID" = "Book"."id"
            ) BETWEEN ${from} AND ${to}`)
    );
  }

  return { cond };
};

export const countReviewsByRatingBooks = () =>
  countTo_5()
    .map((pair) => {
      const key = `reviews__${replacePoint(pair[0])}__${replacePoint(pair[1])}`;

      const sql = `(
          SELECT COALESCE(COUNT(DISTINCT r.id), 0)
          FROM "reviews" AS r
          WHERE r.rating BETWEEN ${pair[0]} AND ${pair[1]}
            AND r."bookID" = "Book".id
        )`;
      return `'${key}', ${sql}`;
    })
    .join(",\n");

export const calcRatingSqlBooks = (): [Literal, string][] => [
  [
    literal(`
      json_build_object(
        'reviewsCount', (
          SELECT COALESCE(COUNT(DISTINCT r.id), 0)
          FROM "reviews" AS r
          WHERE r."bookID" = "Book".id
        ),
        'avgRating', (
          SELECT TO_CHAR(ROUND(COALESCE(AVG(r.rating), 0.0), 1), 'FM0.0')
          FROM "reviews" AS r
          WHERE r."bookID" = "Book".id
        ),
        ${countReviewsByRatingBooks()}
      )
    `),
    "ratingStats",
  ],
];
export const calcRatingSqlStores = (): [Literal, string][] => [
  [
    literal(`
      json_build_object(
        'reviewsCount', (
          SELECT COALESCE(COUNT(DISTINCT r.id), 0)
          FROM "books" AS b
          INNER JOIN "reviews" AS r ON b.id = r."bookID"
          WHERE b."bookStoreID" = "BookStore"."id"
        ),
        'avgRating', (
          SELECT TO_CHAR(ROUND(COALESCE(AVG(r.rating), 0), 1), 'FM0.0')
          FROM "books" AS b
          INNER JOIN "reviews" AS r ON b.id = r."bookID"
          WHERE b."bookStoreID" = "BookStore"."id"
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
            )`;
          })
          .join(",\n")}
      )
    `),
    "ratingStats",
  ],
];

const countOrdersSql = (stage: OrderStage): Literal =>
  literal(`(SELECT COALESCE(COUNT(DISTINCT "orders"."id"), 0)
    FROM "orders" 
    WHERE "orders"."stage" = '${stage}'
    AND "orders"."bookStoreID" = "BookStore"."id"
    )`);

export const countOrdersStores = (): [Literal, string][] => [
  [
    literal(`
      json_build_object(
      'ordersCount', (
        SELECT COALESCE(COUNT(DISTINCT o.id), 0)
        FROM "orders" AS o
        WHERE o."bookStoreID" = "BookStore"."id"
      ),
      ${Object.values(OrderStage)
        .map((stage) => {
          const k = "orders" + capChar(stage) + capChar("count");
          const sql = countOrdersSql(stage);

          // console.log(sql);
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
        ),
        'avgPrice', (
          SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
          FROM "books" AS b
          WHERE b."bookStoreID" = "BookStore"."id"
        ),
        'avgQty', (
          SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
          FROM "books" AS b
          WHERE b."bookStoreID" = "BookStore"."id"
        )
      )
      `),
    "booksStats",
  ],
];
