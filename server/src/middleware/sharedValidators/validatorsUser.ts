import { check } from "express-validator";
import { REG_NAME, REG_PWD } from "../../config/regex.js";

export const validateEmail = [
  check("email")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Email can not have more than 50 chars")
    .isEmail()
    .withMessage("Invalid email address"),
];

export const validatePassword = [
  check("password")
    .trim()
    .isLength({ min: 8, max: 50 })
    .withMessage("Password must be between 8 and 30 chars")
    .matches(REG_PWD)
    .withMessage("Invalid password format"),
];

const nameFields = [
  {
    field: "firstName",
    label: "First Name",
  },
  {
    field: "lastName",
    label: "Last Name",
  },
];

export const validateName = [
  ...nameFields.map((el) =>
    check(el.field)
      .trim()
      .isLength({ min: 1, max: 30 })
      .withMessage(`${el.label} must be between 2 and 30 chars`)
      .matches(REG_NAME)
      .withMessage(`Invalid ${el.label} format`)
  ),
];
