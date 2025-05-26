import { Op, WhereOptions } from "sequelize";
import { findVal } from "../utils/formatters.js";

export const handleQueryDelivery = (val: string | string[]) => {
  const deliveryConditions: WhereOptions = [];
  if (findVal(val, "free_delivery"))
    deliveryConditions.push({
      deliveryPrice: {
        [Op.lte]: 0,
      },
    });

  if (findVal(val, "delivery_charged"))
    deliveryConditions.push({
      deliveryPrice: {
        [Op.gt]: 0,
      },
    });

  return { deliveryConditions };
};
