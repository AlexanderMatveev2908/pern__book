import { check } from "express-validator";
import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateEventToken } from "../sharedValidators/events.js";
import { validateVerifyToken } from "../sharedValidators/verifyToken.js";
import { REG_ID } from "../../config/regex.js";

export const validateVerify = [
  check("userID").matches(REG_ID).withMessage("Invalid userID format"),

  ...validateEventToken,
  ...validateVerifyToken,

  handleValidator(401),
];
