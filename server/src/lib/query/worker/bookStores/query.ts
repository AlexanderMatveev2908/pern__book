import { Op, WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";
import { parseArrFromStr } from "../../../dataStructures.js";
import { handleQueryDelivery } from "../../general.js";

export const queryStoresWorker = (req: ReqApp) => {
  const queryStores: WhereOptions = {};

  for (const pair of Object.entries(req.query ?? {})) {
    const [k, v] = pair;

    switch (k) {
      case "name":
      case "country":
      case "state":
      case "city":
        queryStores[k] = {
          [Op.iLike]: `%${v}%`,
        };
        break;

      case "categories":
        queryStores.categories = {
          [Op.contains]: parseArrFromStr(v as string | string[]),
        };
        break;

      case "delivery": {
        const { deliveryConditions } = handleQueryDelivery(
          v as string | string[]
        );

        if (deliveryConditions.length)
          queryStores[Op.or as any] = [
            ...(queryStores[Op.or as any] ?? []),
            ...deliveryConditions,
          ];

        break;
      }

      default:
        break;
    }
  }

  return {
    queryStores,
  };
};
