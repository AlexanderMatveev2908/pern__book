import { Response } from "express";
import { literal, OrderItem } from "sequelize";
import { BookStore } from "../../../models/all/BookStore.js";
import { ImgBookStore } from "../../../models/all/img&video/ImgBookStore.js";
import { VideoBookStore } from "../../../models/all/img&video/VideoBookStore.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { Book } from "../../../models/all/Book.js";
import { Review } from "../../../models/all/Review.js";
import { User } from "../../../models/all/User.js";
import { Literal } from "sequelize/lib/utils";
import { err404 } from "../../../lib/responseClient/err.js";
import { BookStoreUser } from "../../../models/all/BookStoreUser.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp, UserRole } from "../../../types/types.js";
import { createStoreQ } from "../../../lib/query/owner/bookStore.js";
import {
  calcRatingSqlStores,
  countOrdersStores,
  countStatsBooksFoStore,
} from "../../../lib/query/general/bookstores.js";
import { sortAndPaginate } from "../../../lib/query/general/sortAndPaginate.js";
import {
  extractNoHits,
  extractOffset,
  extractSorters,
} from "../../../lib/utils/formatters.js";
import { sortByTimeStamps } from "../../../lib/query/general/sort.js";

const countWorkSql = (role: UserRole): Literal =>
  literal(`(
    SELECT COALESCE(
      COUNT(DISTINCT "book_stores_users"."userID"), 0
    )
    FROM "book_stores_users"
    WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
      AND "book_stores_users"."role" = '${role}'
  )`);

const myCoolSql = [
  ...calcRatingSqlStores(),
  ...countOrdersStores(),
  ...countStatsBooksFoStore(),

  [
    literal(`json_build_object(
      'teamCount', (
          SELECT COALESCE(COUNT(DISTINCT "book_stores_users"."id"), 0)
          FROM "book_stores_users"
          WHERE "book_stores_users"."bookStoreID" = "BookStore"."id"
      ),
      'managersCount', ${countWorkSql(UserRole.MANAGER).val},
      'employeesCount', ${countWorkSql(UserRole.EMPLOYEE).val}
    )`),
    "teamStats",
  ],
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
        model: OrderStore,
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
  const { queryStore, queryOrders, queryAfterPipe } = createStoreQ(req);

  const { rows: bookStores, count } = await BookStore.findAndCountAll({
    where: queryStore,

    include: [
      {
        model: ImgBookStore,
        as: "images",
        separate: true,
      },
      {
        model: OrderStore,
        as: "orders",
        separate: true,
        where: queryOrders,
        // ? WITHOUT REQUIRED IT WOULD BE A LEFT JOIN WHERE WE GET ALL DATA EVEN INNER MODELS DOES NOT MATCH OPT, WITH REQUIRED IT IS AN INNER JOIN AND INNER DATA MUST MATCH AND RESPECT PARAMS PROVIDED
        required: !!Object.keys(queryOrders).length,
      },

      {
        model: Book,
        as: "books",
        separate: true,
        attributes: ["id", "qty", "price"],
        include: [
          {
            model: Review,
            separate: true,
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
    group: ["BookStore.id"],
    having: queryAfterPipe,

    ...extractOffset(req),

    order: [
      ...((req.query?.avgRatingSort
        ? [
            ...sortByTimeStamps(req),
            [
              literal(`(
            SELECT ROUND(COALESCE(AVG(r.rating), 0.0), 1)
            FROM "reviews" AS r
            INNER JOIN "books" AS b
            ON r."bookID" = b.id
            WHERE b."bookStoreID" = "BookStore".id  
            )`),
              req.query.avgRatingSort,
            ],
          ]
        : []) as OrderItem[]),

      ...((req?.query?.avgQtySort
        ? [
            [
              literal(`(
            SELECT COALESCE(AVG(b.qty), 0)
            FROM "books" AS b
            WHERE b."bookStoreID" = "BookStore".id  
            AND b."deletedAt" IS NULL
            )`),
              req.query.avgQtySort,
            ],
          ]
        : []) as OrderItem[]),

      ...((req?.query?.avgPriceSort
        ? [
            [
              literal(`(
            SELECT COALESCE(AVG(b.price), 0)
            FROM "books" AS b
            WHERE b."bookStoreID" = "BookStore".id  
            AND b."deletedAt" IS NULL
            )`),
              req.query.avgPriceSort,
            ],
          ]
        : []) as OrderItem[]),
    ],
  });

  const { totPages, nHits } = extractNoHits(req, count as any);

  return res200(res, { bookStores, nHits, totPages });
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
