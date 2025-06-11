import { check } from "express-validator";
import { allOrNothingStr } from "../../../lib/dataStructures.js";
import { REG_ID, REG_INT, REG_PRICE } from "../../../config/regex.js";
import { handleValidator } from "../../../lib/middleware/handleValidator.js";
import { generalValidatorGetStores } from "../../sharedValidators/searchQuery/stores/getStores.js";
import { checkDelivery } from "../../sharedValidators/searchQuery/general/db.js";

export const validateQueryListStores = [
  ...generalValidatorGetStores,
  check("ID").custom((val) =>
    allOrNothingStr(REG_ID, val) ? true : Promise.reject("Invalid ID")
  ),

  check().custom((_, { req }) => {
    const expectedArr = ["categories", "orders", , "avgRating"];
    const expectedFloat = ["minAvgPrice", "maxAvgPrice"];
    const expectedInt = [
      "minAvgQty",
      "maxAvgQty",
      "workers",
      "managers",
      "employees",
    ];

    for (const pair in Object.entries(req?.query ?? {})) {
      checkDelivery(pair[0], pair[1]);

      if (expectedArr.includes(pair[0]) && !Array.isArray(pair[1]))
        throw new Error("Invalid data structures of array");
      if (
        Array.isArray(pair[1]) &&
        pair[1].some((el) => typeof el !== "string")
      )
        throw new Error("Invalid vals array");

      if (
        expectedFloat.includes(pair[0]) &&
        !allOrNothingStr(REG_PRICE, pair[1])
      )
        throw new Error("Received wrong price format");

      if (expectedInt.includes(pair[0]) && !allOrNothingStr(REG_INT, pair[1]))
        throw new Error("Expect int, received wrong format ");
    }

    return true;
  }),

  handleValidator(422),
];
