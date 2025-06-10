import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { Thumb } from "../../models/all/img&video/Thumb.js";
import { literal } from "sequelize";
import { err404 } from "../../lib/responseClient/err.js";
import { User } from "../../models/all/User.js";
import { tErr } from "../../stuff/quick.js";

export const getUserProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  // tErr();

  if (!userID) return res204(res);

  const user = await User.findByPk(userID, {
    // attributes is like select in mongoose where u specify what u want or what to exclude with - like (-password, ...ecc)
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "tempEmail"],
      include: [
        [
          literal(`(
      SELECT CASE 
        WHEN COUNT(*) > 0 THEN true 
        ELSE false 
      END
      FROM "book_stores" AS bs
      WHERE bs."ownerID" = "User"."id"
      AND bs."deletedAt" IS NULL
          )`),
          "isOwner",
        ],
        [
          literal(`(
          SELECT CASE 
            WHEN COUNT(*) > 0 THEN true 
            ELSE false 
          END
          FROM "book_stores_users" AS bsu
          WHERE bsu."userID" = "User"."id"
          )`),
          "isWorker",
        ],
        [
          literal(`(
          SELECT CASE 
            WHEN COUNT(*) > 0 THEN true 
            ELSE false 
          END
          FROM "book_stores" AS bs
          INNER JOIN "books" AS b ON bs."id" = b."bookStoreID"
          WHERE bs."ownerID" = "User"."id"
          AND b."deletedAt" IS NULL
          )`),
          "hasBooks",
        ],
        [
          literal(`(
    SELECT CASE 
      WHEN COUNT(*) > 0 THEN true 
      ELSE false 
    END
    FROM "book_stores" AS bs
    INNER JOIN "book_stores_users" AS bsu ON bs."id" = bsu."bookStoreID"
    INNER JOIN "users" AS u ON bsu."userID" = u."id"
    WHERE bs."ownerID" = "User"."id"
            )`),
          "hasWorkers",
        ],
        [
          literal(`(
          SELECT CASE 
            WHEN COUNT(*) > 0 THEN true 
            ELSE false 
          END
          FROM "carts" AS c
          INNER JOIN "cart_items" AS ci ON c."id" = ci."cartID"
          WHERE c."userID" = "User"."id"
          )`),
          "hasCart",
        ],
        [
          literal(`(
          SELECT COALESCE(SUM(ci.qty), 0)
          FROM "carts" AS c
          INNER JOIN "cart_items" AS ci ON c."id" = ci."cartID"
          WHERE c."userID" = "User"."id"
          )::INT`),
          "cartCount",
        ],
        [
          literal(`(
          EXISTS
            (
          SELECT 1
          FROM "orders_stores" AS os
          INNER JOIN "book_stores" AS bs ON os."bookStoreID" = bs."id"
          AND bs."ownerID" = "User"."id"
          AND os."deletedAt" IS NULL
          AND os."stage" != 'pending'
            )
          )`),
          "hasBusinessOrders",
        ],
      ],
    },
    // include is like populate in mongoose ODM( object data modelling instead of object relational mapping) that allow u to get the data referenced by id after `populate` that field with real data and not just leaving the id as string
    include: [
      {
        model: Thumb,
        attributes: { exclude: [] },
        as: "thumb",
      },
    ],

    // raw is like lean or toObject in mongoose and it allow u to to get data as js obj and not as document mongoDB, in this case postGres model, it also make operation faster
    raw: true,
    // nest exist just in sql, in mongoDB objects are naturally nested by default and u do not need to specify it as characteristic
    nest: true,
  });

  if (!user) return err404(res, { msg: "user not found" });

  return res200(res, {
    user: user,
  });
};
