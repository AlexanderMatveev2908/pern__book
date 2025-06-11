import { check } from "express-validator";
import { allOrNothingStr } from "../../../../lib/dataStructures.js";
import { REG_ID } from "../../../../config/regex.js";

export const checkPagination = [
  check("limit").toInt().isInt().withMessage("Invalid limit number"),
  check("page").toInt().isInt().withMessage("Invalid page number"),

  check().custom((_, { req }) => {
    const q = req?.query ?? {};

    for (const k in q) {
      const v = q[k];

      if (k.includes("Sort") && !["ASC", "DESC"].includes(v))
        throw new Error("Invalid sort val");

      if (k.includes("ID") && !allOrNothingStr(REG_ID, v))
        throw new Error("Invalid ID");
    }
  }),
];
