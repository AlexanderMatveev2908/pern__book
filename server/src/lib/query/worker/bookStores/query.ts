import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";

export const queryStoresWorker = (req: ReqApp) => {
  const queryStores: WhereOptions = {};

  for (const pair of Object.entries(req.query ?? {})) {
    const [k, v] = pair;

    switch (k) {
      case "name":
      case "country":
      case "state":
      case "city":
        {
          queryStores[k] = {
            [Op.iLike]: `%${v}%`,
          };
        }
        break;

      default:
        break;
    }
  }

  return {
    queryStores,
  };
};
