import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { isStr, parseArrFromStr } from "../../dataStructures.js";

export const makeBooksQ = (req: ReqApp) => {
  const { userID } = req;
  const q = req.query ?? {};
  const queryStores: WhereOptions = {
    ownerID: userID,
  };
  const queryBooks: WhereOptions = {};

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

      default:
        break;
    }
  }

  return {
    queryBooks,
    queryStores,
  };
};
