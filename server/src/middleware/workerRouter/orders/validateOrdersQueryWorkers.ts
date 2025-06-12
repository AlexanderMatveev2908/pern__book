import { check } from "express-validator";
import { handleValidator } from "../../sharedValidators/handleValidator.js";
import { generalValidatorQueryOrders } from "../../sharedValidators/searchQuery/orders/generalValidatorQueryOrders.js";
import { REG_ID } from "../../../config/regex.js";

export const validateOrdersQueryWorkers = [
  check("bookStoreID").matches(REG_ID).withMessage("Invalid store id"),

  ...generalValidatorQueryOrders(),

  handleValidator(422),
];
