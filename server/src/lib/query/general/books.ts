import { literal, Op, WhereOptions } from "sequelize";
import { parseArrFromStr, replacePoint } from "../../dataStructures.js";
import { countTo_5 } from "../../utils/utils.js";
import { Literal } from "sequelize/lib/utils";

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
