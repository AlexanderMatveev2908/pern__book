import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { parseArrFromStr } from "../../dataStructures.js";
import {
  handleCommonQueryBooks,
  handleQueryAvgRatingBooks,
} from "../general.js";

export const makeQueryBooksConsumer = (req: ReqApp) => {
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

      default:
        break;
    }
  }

  return { queryBooks, queryStores };
};
