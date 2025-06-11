import { check } from "express-validator";
import { handleValidator } from "../../../lib/middleware/handleValidator.js";
import { REG_ID, REG_STORE_NAME } from "../../../config/regex.js";
import { allOrNothingStr } from "../../../lib/dataStructures.js";

export const validateQueryOwnerOrders = [
  check("orderID").matches(REG_ID).withMessage("Invalid order ir"),
  check("bookStoreID").matches(REG_ID).withMessage("Invalid book store id"),
  check("bookStoreName").custom((val) =>
    allOrNothingStr(REG_STORE_NAME, val)
      ? true
      : Promise.reject("Invalid store name")
  ),

  handleValidator(422),
];
