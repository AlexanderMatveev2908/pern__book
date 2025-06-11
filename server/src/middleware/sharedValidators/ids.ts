import { check } from "express-validator";
import { REG_ID } from "../../config/regex.js";
import { handleValidator } from "./handleValidator.js";
import { allOrNothingStr } from "../../lib/dataStructures.js";

export const checkID = (key: string) => [
  check(key).matches(REG_ID).withMessage("Invalid ID"),
  handleValidator(422),
];

export const checkQueryFn = (key: string) =>
  check(key).custom((v) =>
    allOrNothingStr(REG_ID, v) ? true : Promise.reject("Invalid ID")
  );
