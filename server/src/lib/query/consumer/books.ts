import { WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { handleQueryDelivery } from "../general/general.js";
import {
  handleCommonQueryBooks,
  handleQueryAvgRatingBooks,
} from "../general/books.js";

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
      case "delivery":
        handleQueryDelivery({
          val: v as string | string[],
          query: queryStores,
          key: "deliveryPrice",
        });
        break;

      default:
        break;
    }
  }

  return { queryBooks, queryStores };
};
