import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";
import {
  handleCommonQueryBooks,
  handleQueryAvgRatingBooks,
} from "../../general.js";

export const makeQueryBooksWorker = (req: ReqApp) => {
  const queryBooks: WhereOptions = {};
  const queryStores: WhereOptions = {};

  for (const k in req.query) {
    const v = req.query[k];

    switch (k) {
      case "title":
      case "author":
      case "year":
      case "minPrice":
      case "maxPrice":
      case "mainCategories":
      case "subCategories":
        handleCommonQueryBooks({
          k,
          v,
          storesQ: queryStores,
          booksQ: queryBooks,
        });
        break;

      case "avgRating":
        handleQueryAvgRatingBooks({
          v: v as string | string[],
          booksQ: queryBooks,
        });
        break;

      case "ID":
        queryBooks.id = v;
        break;

      case "minQty":
        queryBooks.qty = {
          [Op.gte]: +v!,
        };
        break;
      case "maxQty":
        queryBooks.qty = {
          ...((queryBooks.qty as any) ?? {}),
          [Op.lte]: +v!,
        };
        break;

      default:
        break;
    }
  }

  return {
    queryBooks,
    queryStores,
  };
};
