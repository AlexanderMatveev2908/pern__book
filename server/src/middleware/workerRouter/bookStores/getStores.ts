import { checkPagination } from "../../sharedValidators/pagination.js";
import { generalValidatorGetStores } from "../../sharedValidators/searchQuery/stores/getStores.js";

export const validateGetStoresWorker = [
  ...checkPagination,
  ...generalValidatorGetStores,
];
