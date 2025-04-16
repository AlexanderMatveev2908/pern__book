import { check } from "express-validator";
import { handleValidator } from "../../../lib/lib.js";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../sharedValidators/validatorsUser.js";

export const validateRegister = [
  ...validateName,
  ...validateEmail,
  ...validatePassword,

  check().custom((_, { req }) =>
    req.body.email === req.body.password
      ? Promise.reject("Password must be different from email")
      : true
  ),

  handleValidator(422),
];
