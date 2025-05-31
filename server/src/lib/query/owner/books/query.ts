import { literal, Op, WhereOptions } from "sequelize";
import { isStr, parseArrFromStr } from "../../../dataStructures.js";
import { ReqApp } from "../../../../types/types.js";
import { handleCommonQueryBooks } from "../../general.js";

export const makeBooksQ = (req: ReqApp) => {
  const { userID } = req;
  const q = req.query ?? {};
  const queryStores: WhereOptions = {
    ownerID: userID,
  };
  const queryBooks: WhereOptions = {};
  const queryRatings: WhereOptions = {};
  const queryAfterPipe: any = {};

  for (const key in q) {
    const v = q[key];
    if ((typeof v === "string" && !isStr(v)) || (Array.isArray(v) && !v.length))
      continue;

    switch (key) {
      case "title":
      case "author":
      case "year":
      case "minPrice":
      case "maxPrice":
      case "mainCategories":
      case "subCategories":
        handleCommonQueryBooks({
          k: key,
          v,
          storesQ: queryStores,
          booksQ: queryBooks,
        });
        break;

      case "bookStoreName":
        queryStores.name = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "bookStoreID":
        queryStores.id = v;
        break;

      case "ID":
        queryBooks.id = v;
        break;

      case "avgRating": {
        const cond: any[] = [];
        for (const opt of parseArrFromStr(v as string | string[])) {
          const [min, max] = opt.split("-").map((el) => +el);

          cond.push(
            literal(`(SELECT COALESCE(AVG(r.rating), 0)
                FROM "reviews" as r
                WHERE r."bookID" = "Book"."id" 
              ) BETWEEN ${min} AND ${max}`)
          );
        }
        queryAfterPipe[Op.or] = [
          ...(queryAfterPipe?.[Op.or]?.length ?? []),
          ...cond,
        ];
        break;
      }

      case "minQty":
        queryBooks.qty = {
          ...(queryBooks.qty ?? {}),
          [Op.gte]: v,
        };
        break;
      case "maxQty":
        queryBooks.qty = {
          ...(queryBooks.qty ?? {}),
          [Op.lte]: v,
        };
        break;

      default:
        break;
    }
  }

  return {
    queryBooks,
    queryStores,
    queryAfterPipe,
  };
};
