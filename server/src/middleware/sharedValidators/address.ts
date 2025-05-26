import { check } from "express-validator";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "../../config/regex.js";
import { validateNull } from "../../lib/dataStructures.js";

export const validateAddress = (opt: boolean = false) => [
  check("country")
    .custom((val) => {
      if (opt && validateNull(val)) return true;

      if (!REG_COUNTRY.test(val)) throw new Error("Invalid country");

      return true;
    })
    .isLength({ max: 50 })
    .withMessage("Length country exceeded"),
  check("state")
    .custom((val) => {
      if (opt && validateNull(val)) return true;

      if (!REG_STATE.test(val)) throw new Error("Invalid state");

      return true;
    })
    .isLength({ max: 50 })
    .withMessage("Length state exceeded"),
  check("city")
    .custom((val) => {
      if (opt && validateNull(val)) return true;

      if (!REG_CITY.test(val)) throw new Error("Invalid city");

      return true;
    })
    .isLength({ max: 50 })
    .withMessage("Length city exceeded"),

  check("street")
    .custom((val) => {
      if (opt && validateNull(val)) return true;

      if (!REG_STREET.test(val)) throw new Error("Invalid street");

      return true;
    })
    .isLength({ max: 100 })
    .withMessage("Length street exceeded"),
  check("zipCode")
    .custom((val) => {
      if (opt && validateNull(val)) return true;

      if (!REG_ZIP.test(val)) throw new Error("Invalid zip code");

      return true;
    })
    .isLength({ max: 9 })
    .withMessage("Length zip code exceeded"),
  check("phone")
    .custom((val) => {
      if (opt && validateNull(val)) return true;

      if (!REG_PHONE.test(val)) throw new Error("Invalid phone number");

      return true;
    })
    .isLength({ max: 21 })
    .withMessage("Length phone exceeded"),
];
