import { check } from "express-validator";
import { REG_ID, REG_INT } from "../../config/regex.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const checkCartItemQty = [
  check("cartItemID").matches(REG_ID).withMessage("invalid id"),

  check("qty")
    .matches(REG_INT)
    .withMessage("invalid integer")
    .custom((val) => +val || Promise.reject("Integer must be positive")),

  handleValidator(422),
];
