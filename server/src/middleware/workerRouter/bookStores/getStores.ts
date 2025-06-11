import { handleValidator } from "../../../lib/middleware/handleValidator.js";
import { checkPagination } from "../../sharedValidators/searchQuery/general/pagination.js";
import { generalValidatorGetStores } from "../../sharedValidators/searchQuery/stores/getStores.js";

export const validateGetStoresWorker = [
  ...checkPagination,
  ...generalValidatorGetStores,

  handleValidator(422),
];
