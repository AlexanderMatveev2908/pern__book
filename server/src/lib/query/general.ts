import { literal, Op, WhereOptions } from "sequelize";
import { capChar, findVal } from "../utils/formatters.js";
import { countTo_5 } from "../utils/utils.js";
import { parseArrFromStr, replacePoint } from "../dataStructures.js";
import { Literal } from "sequelize/lib/utils";
import { OrderStage } from "../../types/all/orders.js";

export const handleQueryDelivery = ({
  val,
  storeQ,
}: {
  val: string | string[];
  storeQ: WhereOptions;
}) => {
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

  if (deliveryConditions.length)
    (storeQ as any)[Op.or as any] = [
      ...((storeQ as any)[Op.or as any] ?? []),
      ...deliveryConditions,
    ];
};

export const handleQueryAvgRatingBooks = ({
  v,
  booksQ,
}: {
  v: string | string[];
  booksQ: WhereOptions;
}) => {
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

  if (cond.length)
    (booksQ as any)[Op.or as any] = [
      ...((booksQ as any)[Op.or as any] ?? []),
      ...cond,
    ];
};

export const handleCommonQueryBooks = ({ k, v, storesQ, booksQ }: any) => {
  switch (k) {
    case "title":
    case "author":
      booksQ[k] = {
        [Op.iLike]: `%${v}%`,
      };
      break;

    case "year":
      booksQ[k] = v;
      break;

    case "mainCategories":
      storesQ.categories = {
        [Op.contains]: parseArrFromStr(v as string | string[]),
      };
      break;

    case "subCategories":
      booksQ.categories = {
        [Op.contains]: parseArrFromStr(v as string | string[]),
      };
      break;

    case "minPrice":
      booksQ.price = {
        [Op.gte]: +v!,
      };
      break;
    case "maxPrice":
      booksQ.price = {
        ...((booksQ.price as any) ?? {}),
        [Op.lte]: +v!,
      };
      break;

    default:
      break;
  }
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
            AND r."deletedAt" IS NULL
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
          AND r."deletedAt" IS NULL
        ),
        'avgRating', (
          SELECT TO_CHAR(ROUND(COALESCE(AVG(r.rating), 0.0), 1), 'FM0.0')
          FROM "reviews" AS r
          WHERE r."bookID" = "Book".id
          AND r."deletedAt" IS NULL
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

const countOrdersSql = (stage: OrderStage): Literal =>
  literal(`(SELECT COALESCE(COUNT(DISTINCT o."id"), 0)
    FROM "orders_stores" AS o
    WHERE o."stage" = '${stage}'
    AND o."bookStoreID" = "BookStore"."id"
    AND o."deletedAt" IS NULL
    )`);

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
      ${Object.values(OrderStage)
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
