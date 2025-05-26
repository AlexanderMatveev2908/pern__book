import { check } from "express-validator";

export const checkPagination = [
  check("limit").toInt().isInt().withMessage("Invalid limit number"),
  check("page").toInt().isInt().withMessage("Invalid page number"),
];
