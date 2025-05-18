import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";

export const makeBooksQ = (req: ReqApp) => {
  const { userID } = req;
  const q = req.query ?? {};
  const queryStores: WhereOptions = {
    ownerID: userID,
  };
  const queryBooks: WhereOptions = {};

  for (const key in q) {
    switch (key) {
      case "bookStoreName":
        queryStores.name = {
          [Op.iLike]: `%${q[key]}%`,
        };
        break;

      default:
        break;
    }
  }

  return {
    queryBooks,
  };
};
