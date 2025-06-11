import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";
import { parseArrFromStr } from "../../../dataStructures.js";

export const makeQueryOrdersOwner = (req: ReqApp) => {
  const { userID } = req;
  const q = req.query ?? {};

  const queryOrders: WhereOptions = {};
  const queryStoreOrders: WhereOptions = {};
  const queryBookStore: WhereOptions = {
    ownerID: userID,
  };

  for (const k in q) {
    const v = q[k];

    switch (k) {
      case "ID":
        queryStoreOrders.id = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "bookStoreID":
        queryStoreOrders.bookStoreID = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "bookStoreName":
        queryBookStore.name = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "categories": {
        const parsed = parseArrFromStr(v as string | string[]);

        queryBookStore.categories = {
          [Op.contains]: parsed,
        };

        break;
      }

      default:
        break;
    }
  }

  return {
    queryOrders,
    queryStoreOrders,
    queryBookStore,
  };
};
