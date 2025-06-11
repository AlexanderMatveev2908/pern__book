import { parseArrFromStr } from "../../../../lib/dataStructures.js";
import { StoreOrderStage } from "../../../../types/all/orders.js";

export const checkOrdersStage = (k: string, v: string) => {
  if (k === "orders") {
    const parsedArr = parseArrFromStr(v as string | string[]);

    for (const stage of parsedArr) {
      if (!Object.values(StoreOrderStage).includes(stage as StoreOrderStage))
        throw new Error("Invalid order stage");
    }
  }
};
