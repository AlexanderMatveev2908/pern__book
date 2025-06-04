import { check } from "express-validator";
import { REG_ID } from "../../config/regex.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const checkID = (key: string) => [
  check(key).matches(REG_ID).withMessage("Invalid ID"),
  handleValidator(422),
];
