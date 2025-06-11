import { check } from "express-validator";
import {
  generalValidationSearchBooks,
  generalValidatorSearchBooksBusiness,
} from "../../sharedValidators/searchQuery/books/generalValidationSearchBooks.js";
import { REG_STORE_NAME } from "../../../config/regex.js";
import { handleValidator } from "../../../lib/middleware/handleValidator.js";
import { allOrNothingStr } from "../../../lib/dataStructures.js";

export const validateGetBooksList = [
  ...generalValidationSearchBooks,
  ...generalValidatorSearchBooksBusiness,

  check("bookStoreName").custom((val) =>
    allOrNothingStr(REG_STORE_NAME, val)
      ? true
      : Promise.reject("Invalid store name")
  ),

  handleValidator(422),
];
