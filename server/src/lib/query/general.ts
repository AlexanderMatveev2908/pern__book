import { literal, Op, WhereOptions } from "sequelize";
import { findVal } from "../utils/formatters.js";
import { countTo_5 } from "../utils/utils.js";
import { replacePoint } from "../dataStructures.js";
import { Literal } from "sequelize/lib/utils";

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
