import { check } from "express-validator";
import { checkDelivery, checkPrices, checkQty } from "../general/db.js";
import { checkPagination } from "../general/pagination.js";
import { checkCategories } from "../general/cat.js";

export const generalValidatorQueryOrders = [
  ...checkPagination,

  check().custom((_, { req }) => {
    const q = req?.query ?? {};

    for (const k in q) {
      const v = q[k];

      checkCategories(k, v);
      checkDelivery(k, v);
      checkPrices(k, v);
      checkQty(k, v);
    }
  }),
];
