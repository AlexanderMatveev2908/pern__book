import { check } from "express-validator";
import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { REG_ID } from "../../config/regex.js";

export const checkStoreID = [
  check("bookStoreID").matches(REG_ID).withMessage("Invalid ID"),
  handleValidator(422),
];
