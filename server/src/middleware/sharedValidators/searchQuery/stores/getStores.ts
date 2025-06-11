import { check } from "express-validator";
import { allOrNothingStr } from "../../../../lib/dataStructures.js";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_STATE,
  REG_STORE_NAME,
} from "../../../../config/regex.js";
import { checkPagination } from "../general/pagination.js";
import { checkCategories } from "../general/cat.js";
import { checkDelivery, checkPrices, checkQty } from "../general/db.js";
import { checkOrdersStage } from "../general/orders.js";

export const generalValidatorGetStores = [
  ...checkPagination,
  check("name").custom((val) =>
    allOrNothingStr(REG_STORE_NAME, val)
      ? true
      : Promise.reject("Invalid store name")
  ),
  check("country").custom((val) =>
    allOrNothingStr(REG_COUNTRY, val) ? true : Promise.reject("Invalid country")
  ),
  check("country").custom((val) =>
    allOrNothingStr(REG_STATE, val) ? true : Promise.reject("Invalid country")
  ),
  check("city").custom((val) =>
    allOrNothingStr(REG_CITY, val) ? true : Promise.reject("Invalid city")
  ),

  check().custom((_, { req }) => {
    const q = req?.query ?? {};

    for (const k in q) {
      const v = q[k];

      checkCategories(k, v);
      checkDelivery(k, v);
      checkPrices(k, v);
      checkQty(k, v);
      checkOrdersStage(k, v);
    }

    return true;
  }),
];
