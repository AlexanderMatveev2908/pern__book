import { check } from "express-validator";
import { handleValidator } from "../sharedValidators/handleValidator.js";
import { validatePassword } from "../sharedValidators/validatorsUser.js";
import { validateVerifyToken } from "../sharedValidators/verifyToken.js";
import { REG_ID } from "../../config/regex.js";

export const validateChoseNewPwd = [
  check("userID").matches(REG_ID).withMessage("Invalid userID format"),

  ...validateVerifyToken,
  handleValidator(401),

  ...validatePassword,
  handleValidator(422),
];
