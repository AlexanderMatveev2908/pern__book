import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { parseArrFromStr } from "../../dataStructures.js";
import { createCondRating } from "../general.js";

export const makeQueryBooksConsumer = (req: ReqApp) => {
  const queryBooks: WhereOptions = {};
  const queryStores: WhereOptions = {};

  for (const k in req.query) {
    const v = req.query[k];

    switch (k) {
      case "title":
      case "author":
        queryBooks[k] = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "year":
        queryBooks[k] = v;
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
        const { cond } = createCondRating(v as string | string[]);

        if (cond.length)
          queryBooks[Op.or as any] = [
            ...(queryBooks[Op.or as any] ?? []),
            ...cond,
          ];

        break;
      }

      case "minPrice":
        queryBooks.price = {
          [Op.gte]: +v!,
        };
        break;
      case "maxPrice":
        queryBooks.price = {
          ...((queryBooks.price as any) ?? {}),
          [Op.lte]: +v!,
        };
        break;

      default:
        break;
    }
  }

  return { queryBooks, queryStores };
};
