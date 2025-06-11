import { handleValidator } from "../../sharedValidators/handleValidator.js";
import {
  generalValidationSearchBooks,
  generalValidatorSearchBooksBusiness,
} from "../../sharedValidators/searchQuery/books/generalValidationSearchBooks.js";

export const checkSearchBooksWorker = [
  ...generalValidationSearchBooks,
  ...generalValidatorSearchBooksBusiness,

  handleValidator(422),
];
