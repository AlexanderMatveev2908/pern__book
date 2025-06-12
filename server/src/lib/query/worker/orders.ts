import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";
import { parseArrFromStr } from "../../dataStructures.js";
import { findVal } from "../../utils/formatters.js";
import { handleQueryDelivery } from "../general/general.js";
import { handleQtyPriceOrdersQuery } from "../general/orders.js";

export const makeQueryOrdersWorker = (req: ReqApp) => {
  const { bookStoreID } = req.params;
  const { query: q } = req;

  const queryStoreOrder: WhereOptions = {
    bookStoreID,
  };
  const queryAfterPipe: WhereOptions = {};

  for (const k in q) {
    const v = q[k];

    switch (k) {
      case "ID":
        queryStoreOrder.id = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "stage":
        queryStoreOrder.stage = {
          [Op.in]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "delivery": {
        handleQueryDelivery({
          val: v as string | string[],
          query: queryStoreOrder,
          key: "delivery",
        });
        break;
      }

      case "minPrice":
      case "maxPrice":
      case "minQty":
      case "maxQty":
        handleQtyPriceOrdersQuery(k, v as string, queryAfterPipe);
        break;

      default:
        break;
    }
  }

  return {
    queryStoreOrder,
    queryAfterPipe,
  };
};
