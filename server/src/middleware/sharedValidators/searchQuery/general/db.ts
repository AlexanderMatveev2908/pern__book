import { REG_INT, REG_PRICE } from "../../../../config/regex.js";
import {
  allOrNothingStr,
  parseArrFromStr,
} from "../../../../lib/dataStructures.js";
import { DeliveryType } from "../../../../types/all/orders.js";

export const checkPrices = (k: string, v: string) => {
  if (["minPrice", "maxPrice"].includes(k) && !allOrNothingStr(REG_PRICE, v))
    throw new Error("Invalid price");
};

export const checkQty = (k: string, v: string) => {
  if (["minQty", "maxQty"].includes(k) && !allOrNothingStr(REG_INT, v))
    throw new Error("Invalid quantity");
};

export const checkDelivery = (k: string, v: string) => {
  if (
    k === "delivery" &&
    !parseArrFromStr(v as string | string[]).some((el) =>
      Object.values(DeliveryType).includes(el as DeliveryType)
    )
  )
    throw new Error("Invalid delivery type");
};
