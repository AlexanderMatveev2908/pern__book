import { check } from "express-validator";
import { REG_TOK } from "../../config/regex.js";

export const validateVerifyToken = [
  check("token")
    .trim()
    .notEmpty()
    .withMessage("token not provided")
    .matches(REG_TOK)
    .withMessage("Invalid token"),
];
