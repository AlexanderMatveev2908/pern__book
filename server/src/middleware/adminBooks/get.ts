import { check } from "express-validator";
import { checkPagination } from "../sharedValidators/pagination.js";
import {
  REG_BOOK_TITLE,
  REG_ID,
  REG_INT,
  REG_NAME,
  REG_PRICE,
  REG_STORE_NAME,
} from "../../config/regex.js";
import { allOrNothingStr } from "../../lib/validateDataStructure.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const validateGetBooksList = [
  ...checkPagination,
  check().custom((_, { req }) => {
    for (const pair in Object.entries(req?.query ?? {})) {
      const k = pair[0];
      const v = pair[1];

      if (k.includes("ID") && !allOrNothingStr(REG_ID, v))
        throw new Error("Invalid ID");

      if (k.includes("qty") && !allOrNothingStr(REG_INT, v))
        throw new Error("Invalid quantity");

      if (k.includes("price") && !allOrNothingStr(REG_PRICE, v))
        throw new Error("Invalid price");

      if (
        k === "year" &&
        (!allOrNothingStr(REG_INT, v) ||
          +(v ?? "") < 1450 ||
          +(v ?? "") > new Date().getFullYear())
      )
        throw new Error("Invalid year");

      if (k === "bookStoreName" && !allOrNothingStr(REG_STORE_NAME, v))
        throw new Error("Invalid store name");

      if (k === "title" && !allOrNothingStr(REG_BOOK_TITLE, v))
        throw new Error("Invalid title");

      if (k === "author" && !allOrNothingStr(REG_NAME, v))
        throw new Error("Invalid author");
    }

    return true;
  }),

  handleValidator(422),
];
