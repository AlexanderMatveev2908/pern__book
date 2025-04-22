import { check } from "express-validator";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "../../config/regex.js";

export const validateAddress = (opt: boolean = false) => [
  check("country").custom((val) => {
    if (opt && !val) return true;

    if (!REG_COUNTRY.test(val)) throw new Error("Invalid country");

    return true;
  }),
  check("state").custom((val) => {
    if (opt && !val) return true;

    if (!REG_STATE.test(val)) throw new Error("Invalid state");

    return true;
  }),
  check("city").custom((val) => {
    if (opt && !val) return true;

    if (!REG_CITY.test(val)) throw new Error("Invalid city");

    return true;
  }),

  check("street").custom((val) => {
    if (opt && !val) return true;

    if (!REG_STREET.test(val)) throw new Error("Invalid street");

    return true;
  }),
  check("zipCode").custom((val) => {
    if (opt && !val) return true;

    if (!REG_ZIP.test(val)) throw new Error("Invalid zip code");

    return true;
  }),
  check("phone").custom((val) => {
    if (opt && !val) return true;

    if (!REG_PHONE.test(val)) throw new Error("Invalid phone number");

    return true;
  }),
];
