import { Response } from "express";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { ReqApp, UserRole } from "../../types/types.js";
import { err404 } from "../../lib/responseClient/err.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { BookStore } from "../../models/all/BookStore.js";
import { ImgBookStore } from "../../models/all/img&video/ImgBookStore.js";
import { calcPagination } from "../../lib/query/pagination.js";
import { Order } from "../../models/all/Order.js";
import { Review } from "../../models/all/Review.js";
import { Book } from "../../models/all/Book.js";
import { User } from "../../models/models.js";
import { literal } from "sequelize";
import { Literal } from "sequelize/lib/utils";
import { OrderStage } from "../../types/all/orders.js";
import { capChar } from "../../lib/utils/formatters.js";
import { VideoBookStore } from "../../models/all/img&video/VideoBookStore.js";
import { sortItems } from "../../lib/query/sort.js";
import { replacePoint } from "../../lib/dataStructures.js";
import { createStoreQ } from "../../lib/query/owner/bookStore/query.js";
import { countTo_5 } from "../../lib/utils/utils.js";

const countWorkSql = (role: UserRole, res: string): [Literal, string] => [
  literal(`(
    SELECT COALESCE(
      COUNT(DISTINCT "book_stores_users"."userID"), 0
    )
    FROM "book_stores_users"
    WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
      AND "book_stores_users"."role" = '${role}'
  )`),
  res,
];

const countOrdersSql = (stage: OrderStage, res: string): [Literal, string] => [
  literal(`(SELECT COALESCE(COUNT(DISTINCT "orders"."id"), 0)
    FROM "orders" 
    WHERE "orders"."stage" = '${stage}'
    AND "orders"."bookStoreID" = "BookStore"."id"
    )`),
  res,
];

const myCoolSql = [
  [
    literal(`(
    SELECT COALESCE(COUNT(DISTINCT b.id), 0)
    FROM "books" AS b
    WHERE b."bookStoreID" = "BookStore"."id"
    )`),
    "booksCount",
  ],
  [
    literal(`(
  SELECT COALESCE(COUNT(DISTINCT o.id), 0)
  FROM "orders" AS o
  WHERE o."bookStoreID" = "BookStore"."id"
  )`),
    "ordersCount",
  ],
  [
    literal(`(
      SELECT COALESCE(COUNT(DISTINCT r.id), 0)
      FROM "books" AS b
      INNER JOIN "reviews" AS r ON b.id = r."bookID"
      WHERE b."bookStoreID" = "BookStore"."id"
    )`),
    "reviewsCount",
  ],
  [
    literal(`
  (SELECT ROUND(COALESCE(AVG(r.rating), 0), 1)
  FROM "books" AS b
  INNER JOIN "reviews" AS r ON b.id = r."bookID"
  WHERE b."bookStoreID" = "BookStore"."id")
`),
    "avgRating",
  ],
  ...countTo_5().map((el, i) => [
    literal(`
  (SELECT COALESCE(COUNT(DISTINCT r.id), 0)
  FROM "books" AS b
  INNER JOIN "reviews" AS r ON b.id = r."bookID"
  WHERE b."bookStoreID" = "BookStore"."id"
    AND r.rating BETWEEN ${el[0]} AND ${el[1]})
`),
    `reviews__${replacePoint(el[0])}__${replacePoint(el[1])}`,
  ]),

  [
    literal(`(
    SELECT ROUND(COALESCE(AVG(b.price), 0), 2)
    FROM "books" AS b
    WHERE b."bookStoreID" = "BookStore"."id"
   ) `),
    "avgPrice",
  ],
  [
    literal(`(
  SELECT ROUND(COALESCE(AVG(b.qty), 0), 0)
  FROM "books" AS b
  WHERE b."bookStoreID" = "BookStore"."id"
  )`),
    "avgQty",
  ],
  ...Object.values(OrderStage).map((el) =>
    countOrdersSql(el, "orders" + capChar(el) + capChar("count"))
  ),
  [
    literal(`(
      SELECT COALESCE(COUNT(DISTINCT "book_stores_users"."id"), 0)
      FROM "book_stores_users"
      WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
    )`),
    "teamCount",
  ],
  countWorkSql(UserRole.MANAGER, "managersCount"),
  countWorkSql(UserRole.EMPLOYEE, "employeesCount"),
];

export const getMyStore = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const bookStore = await BookStore.findOne({
    where: {
      ownerID: userID,
      id: bookStoreID,
    },
    include: [
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: VideoBookStore,
        as: "video",
      },
      {
        model: Order,
        as: "orders",
      },
      {
        model: Book,
        as: "books",
        include: [
          {
            model: Review,
            as: "reviews",
            attributes: ["rating", "bookID", "id"],
          },
        ],
      },
      {
        model: User,
        as: "team",
      },
    ],
    group: [
      "BookStore.id",
      "images.id",
      "video.id",
      "orders.id",
      "books->reviews.id",
      "books.id",
      "team.id",
      "team->BookStoreUser.id",
    ],
    attributes: {
      include: myCoolSql as [[Literal, string]],
    },
  });

  if (!bookStore) return err404(res, { msg: "Bookstore not found" });

  const team = await BookStoreUser.findAll({
    where: { bookStoreID: bookStore.id },
  });

  const bookStoreObj = {
    ...bookStore.toJSON(),
    team,
  };

  return res200(res, { bookStore: bookStoreObj });
};

export const getAllStores = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const count = await BookStore.count({
    where: {
      ownerID: userID,
    },
  });
  if (!count) return res204(res);

  const { queryStore, queryOrders, queryAfterPipe } = createStoreQ(req);

  const bookStores = await BookStore.findAll({
    where: queryStore,
    include: [
      {
        model: ImgBookStore,
        as: "images",
      },
      {
        model: Order,
        as: "orders",
        where: queryOrders,
        // ? WITHOUT REQUIRED IT WOULD BE A LEFT JOIN WHERE WE GET ALL DATA EVEN INNER MODELS DOES NOT MATCH OPT, WITH REQUIRED IT IS AN INNER JOIN AND INNER DATA MUST MATCH AND RESPECT PARAMS PROVIDED
        required: !!Object.keys(queryOrders).length,
      },

      {
        model: Book,
        as: "books",
        attributes: ["id", "qty", "price"],
        include: [
          {
            model: Review,
            as: "reviews",
            attributes: ["rating", "bookID", "id"],
          },
        ],
      },
      {
        model: User,
        as: "team",
        attributes: ["firstName", "lastName"],
        // through: {
        // attributes: ["id", "role", "bookStoreID", "userID"],
        // },
        where: {},
        required: false,
      },
    ],
    // ? ADDING CUSTOM FIELDS IS LIKE USING $LOOKUP, THEN $UNWIND, THEN $SET( OR $ADD_FIELDS ON OLDER VERSIONS) WITH MONGOOSE(ODM OF MONGO_DB) FOR NO_SQL_LANGUAGE, AT THE END ITEMS TAKEN EACH ONE IN ITS OWN AS OBJ WITH ALL PROPS OF PARENT NEEDS TO BE GROUPED AGAIN AS ITEM OF A LIST(ITEM OF ARRAY AS ELEMENT), TO DO THAT WE NEED GROUP
    attributes: {
      include: myCoolSql,
    } as any,
    group: [
      "BookStore.id",
      "images.id",
      "orders.id",
      "books->reviews.id",
      "books.id",
      "team.id",
      "team->BookStoreUser.id",
    ],
    having: queryAfterPipe,
    // limit: 2,
    // offset: 3,
    // order: sorters,
  });

  const nHits = bookStores.length;
  if (!nHits) return res204(res);

  const { sorted } = sortItems(req, bookStores);

  const { paginated, totPages } = calcPagination({
    req,
    nHits,
    els: sorted,
  });

  return res200(res, { bookStores: paginated, nHits, totPages });
};

/*
  bookStores.sort((a, b) => {
    for (const [k, v] of sorters) {
      const valA = a[k as keyof typeof a];
      const valB = b[k as keyof typeof b];

      switch (k) {
        case "createdAt":
        case "updatedAt": {
          const formattedA = valA.getTime();
          const formattedB = valB.getTime();

          if (formattedA === formattedB) return 0;

          if (v === "ASC") return formattedA > formattedB ? 1 : -1;
          else return formattedA < formattedB ? 1 : -1;
        }
      }

      if (valA === valB) continue;

      if (v === "ASC") return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    }
    return 0;
  });
  */
