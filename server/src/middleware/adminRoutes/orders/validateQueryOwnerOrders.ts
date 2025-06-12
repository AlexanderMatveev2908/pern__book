import { handleValidator } from "../../sharedValidators/handleValidator.js";
import { generalValidatorQueryOrders } from "../../sharedValidators/searchQuery/orders/generalValidatorQueryOrders.js";
import { checkQueryFn } from "../../sharedValidators/ids.js";
import { checkCategories } from "../../sharedValidators/searchQuery/general/cat.js";

export const validateQueryOwnerOrders = [
  ...generalValidatorQueryOrders([(k, v) => checkCategories(k, v)]),

  checkQueryFn("orderID"),
  checkQueryFn("bookStoreID"),

  handleValidator(422),
];
