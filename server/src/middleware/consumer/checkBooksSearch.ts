import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { generalValidationSearchBooks } from "../sharedValidators/searchQuery/books/generalValidationSearchBooks.js";

export const checkBooksSearchConsumer = [
  ...generalValidationSearchBooks,

  handleValidator(422),
];
