import { check } from "express-validator";
import { allOrNothingStr } from "../../../lib/dataStructures.js";
import { REG_INT } from "../../../config/regex.js";
import { handleValidator } from "../../sharedValidators/handleValidator.js";
import { generalValidatorGetStores } from "../../sharedValidators/searchQuery/stores/getStores.js";
import { checkDelivery } from "../../sharedValidators/searchQuery/general/db.js";

export const validateQueryListStores = [
  ...generalValidatorGetStores,

  check().custom((_, { req }) => {
    const expectedInt = ["workers", "managers", "employees"];

    for (const pair in Object.entries(req?.query ?? {})) {
      checkDelivery(pair[0], pair[1]);

      if (
        Array.isArray(pair[1]) &&
        pair[1].some((el) => typeof el !== "string")
      )
        throw new Error("Invalid vals array");

      if (expectedInt.includes(pair[0]) && !allOrNothingStr(REG_INT, pair[1]))
        throw new Error("Expect int, received wrong format ");
    }

    return true;
  }),

  handleValidator(422),
];
