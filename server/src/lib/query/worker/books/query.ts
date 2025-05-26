import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";

export const makeQueryBooksWorker = (req: ReqApp) => {
  const queryBooks: WhereOptions = {};

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

      case "ID":
        queryBooks.id = v;
        break;

      default:
        break;
    }
  }

  return {
    queryBooks,
  };
};
