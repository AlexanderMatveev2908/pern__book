import { check } from "express-validator";
import { REG_INT } from "../../config/regex.js";
import { handleValidator } from "../sharedValidators/handleValidator.js";

export const checkCartItemQty = (min: number) => [
  check("qty")
    .matches(REG_INT)
    .withMessage("invalid integer")
    .toInt()
    .isInt({ min })
    .withMessage("invalid integer"),

  handleValidator(422),
];
