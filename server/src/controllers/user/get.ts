import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { User } from "../../models/models.js";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { Thumb } from "../../models/all/img&video/Thumb.js";
import { BookStore } from "../../models/all/BookStore.js";
import { BookStoreUser } from "../../models/all/BookStoreUser.js";
import { literal, Op } from "sequelize";
import { Book } from "../../models/all/Book.js";
import { err401, err404 } from "../../lib/responseClient/err.js";

export const getUserProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

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
