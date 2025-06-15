import { check } from "express-validator";
import { REG_ID } from "../../config/regex.js";
import { allOrNothingStr, parseArrFromStr } from "../../lib/dataStructures.js";
import { handleValidator } from "../sharedValidators/handleValidator.js";
import { checkPagination } from "../sharedValidators/searchQuery/general/pagination.js";
import { generalValidatorQueryOrders } from "../sharedValidators/searchQuery/orders/generalValidatorQueryOrders.js";
import {
  checkDelivery,
  checkPrices,
  checkQty,
} from "../sharedValidators/searchQuery/general/db.js";
import { OrderStage } from "../../types/all/orders.js";

export const checkQueryOrders = [
  ...checkPagination,

  check().custom((_, { req }) => {
    const q = req?.query ?? {};

    for (const k in q) {
      const v = q[k];

      if (k === "ID" && !allOrNothingStr(REG_ID, v))
        throw new Error("Invalid ID");

      checkDelivery(k, v);
      checkPrices(k, v);
      checkQty(k, v);

      if (k === "stage") {
        if (
          parseArrFromStr(v as string | string[]).some(
            (el) => !Object.values(OrderStage).includes(el as OrderStage)
          )
        )
          throw new Error("Invalid order stage");
      }
    }

    return true;
  }),

  handleValidator(422),
];
