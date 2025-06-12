import { check } from "express-validator";
import { checkDelivery, checkPrices, checkQty } from "../general/db.js";
import { checkPagination } from "../general/pagination.js";
import { checkCategories } from "../general/cat.js";
import { parseArrFromStr } from "../../../../lib/dataStructures.js";
import { StoreOrderStage } from "../../../../types/all/orders.js";

export const generalValidatorQueryOrders = (
  cbs?: [(k: string, v: string) => void]
) => [
  ...checkPagination,

  check().custom((_, { req }) => {
    const q = req?.query ?? {};

    for (const k in q) {
      const v = q[k];

      checkDelivery(k, v);
      checkPrices(k, v);
      checkQty(k, v);

      if (cbs?.length) for (const cb of cbs) cb(k, v);

      if (k === "stage") {
        if (
          parseArrFromStr(v as string | string[]).some(
            (el) =>
              !Object.values(StoreOrderStage).includes(el as StoreOrderStage)
          )
        )
          throw new Error("Invalid order stage");
      }
    }

    return true;
  }),
];
