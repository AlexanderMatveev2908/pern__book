import { check } from "express-validator";
import { handleValidator } from "../../sharedValidators/handleValidator.js";
import { REG_ID, REG_STORE_NAME } from "../../../config/regex.js";
import { allOrNothingStr } from "../../../lib/dataStructures.js";
import { generalValidatorQueryOrders } from "../../sharedValidators/searchQuery/orders/generalValidatorQueryOrders.js";
import { checkQueryFn } from "../../sharedValidators/ids.js";

export const validateQueryOwnerOrders = [
  ...generalValidatorQueryOrders,

  checkQueryFn("orderID"),
  checkQueryFn("bookStoreID"),
  check("bookStoreName").custom((val) =>
    allOrNothingStr(REG_STORE_NAME, val)
      ? true
      : Promise.reject("Invalid store name")
  ),

  handleValidator(422),
];
