import { check } from "express-validator";
import { REG_ID } from "../../config/regex.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const validateIDs = [
  check().custom((_, { req }) => {
    const { params, query, body } = req;

    const sources = [query, body, params];

    for (const source of sources) {
      if (
        Object.entries(source ?? {}).some(
          ([key, val]) => key.includes("ID") && !REG_ID.test(val as string)
        )
      )
        throw new Error("Invalid ID format");
    }

    return true;
  }),
];

export const checkStoreID = [
  check("bookStoreID").matches(REG_ID).withMessage("Invalid ID"),
  handleValidator(422),
];

export const checkBookID = [
  check("bookID").matches(REG_ID).withMessage("Invalid book ID format"),

  handleValidator(422),
];
