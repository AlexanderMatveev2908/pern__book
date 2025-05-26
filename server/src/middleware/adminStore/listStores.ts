import { check } from "express-validator";
import { allOrNothingStr } from "../../lib/dataStructures.js";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_ID,
  REG_INT,
  REG_PRICE,
  REG_STATE,
  REG_STORE_NAME,
} from "../../config/regex.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { checkPagination } from "../sharedValidators/pagination.js";
import { generalValidatorGetStores } from "../sharedValidators/searchQuery/stores/getStores.js";

export const validateQueryListStores = [
  ...generalValidatorGetStores,
  check("ID").custom((val) =>
    allOrNothingStr(REG_ID, val) ? true : Promise.reject("Invalid ID")
  ),

  check().custom((_, { req }) => {
    const expectedArr = ["categories", "orders", "delivery", "avgRating"];
    const expectedFloat = ["minAvgPrice", "maxAvgPrice"];
    const expectedInt = [
      "minAvgQty",
      "maxAvgQty",
      "workers",
      "managers",
      "employees",
    ];

    for (const pair in Object.entries(req?.query ?? {})) {
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

  check().custom((_, { req }) => {
    for (const pair in Object.entries(req.query ?? {})) {
      if (pair[0].includes("Sort") && !["ASC", "DESC"].includes(pair[1]))
        throw new Error("Invalid sort val");
    }

    return true;
  }),

  ...checkPagination,

  handleValidator(422),
];
