import { check } from "express-validator";
import { handleValidator } from "../../../lib/middleware/handleValidator.js";

export const checkTotPrice = [
  check("totPrice")
    .toFloat()
    .isFloat({ min: 0.01 })
    .withMessage("Invalid total price"),

  handleValidator(422),
];
