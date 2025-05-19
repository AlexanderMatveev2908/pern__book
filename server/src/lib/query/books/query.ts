import { literal, Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { isStr, parseArrFromStr } from "../../dataStructures.js";

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

      case "year":
        queryBooks.year = v;

      case "title":
      case "author":
        queryBooks[key] = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "mainCategories":
        queryStores.categories = {
          [Op.contains]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "subCategories":
        queryBooks.categories = {
          [Op.contains]: parseArrFromStr(v as string | string[]),
        };
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

      case "minPrice":
        queryBooks.price = {
          ...(queryBooks.price ?? {}),
          [Op.gte]: v,
        };
        break;
      case "maxPrice":
        queryBooks.price = {
          ...(queryBooks.price ?? {}),
          [Op.lte]: v,
        };
        break;

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
