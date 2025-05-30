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
import { allOrNothingStr } from "../../lib/dataStructures.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { CatBookStore } from "../../types/all/bookStore.js";
import { subcategories } from "../../types/all/books.js";
import {
  generalValidationSearchBooks,
  generalValidatorSearchBooksBusiness,
} from "../sharedValidators/searchQuery/books/generalValidationSearchBooks.js";

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
