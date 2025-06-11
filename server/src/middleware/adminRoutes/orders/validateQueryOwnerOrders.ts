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

  handleValidator(422),
];
