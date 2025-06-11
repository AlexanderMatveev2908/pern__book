import { check } from "express-validator";
import { checkPagination } from "../general/pagination.js";
import { allOrNothingStr } from "../../../../lib/dataStructures.js";
import { REG_BOOK_TITLE, REG_INT, REG_NAME } from "../../../../config/regex.js";
import { checkPrices, checkQty } from "../general/db.js";
import { checkCategories } from "../general/cat.js";

export const generalValidationSearchBooks = [
  ...checkPagination,

  check().custom((_, { req }) => {
    const q = req?.query ?? {};
    const params = Object.entries(q);

    for (const pair of params) {
      const k = pair[0];
      const v = pair[1];

      checkPrices(k, v);
      checkCategories(k, v);

      if (
        k === "year" &&
        (!allOrNothingStr(REG_INT, v) ||
          +(v ?? "") < 1450 ||
          +(v ?? "") > new Date().getFullYear())
      )
        throw new Error("Invalid year");
      if (k === "title" && !allOrNothingStr(REG_BOOK_TITLE, v))
        throw new Error("Invalid title");
      if (k === "author" && !allOrNothingStr(REG_NAME, v))
        throw new Error("Invalid author");
    }

    return true;
  }),
];

export const generalValidatorSearchBooksBusiness = [
  check().custom((_, { req }) => {
    const q = req?.query ?? {};
    const params = Object.entries(q);

    for (const pair of params) {
      const k = pair[0];
      const v = pair[1];

      checkQty(k, v);
    }

    return true;
  }),
];
