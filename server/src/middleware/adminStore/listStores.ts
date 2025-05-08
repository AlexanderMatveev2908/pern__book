import { check } from "express-validator";
import { allOrNothingStr } from "../../lib/validateDataStructure.js";
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

export const validateQueryListStores = [
  check("name").custom((val) =>
    allOrNothingStr(REG_STORE_NAME, val)
      ? true
      : Promise.reject("Invalid store name")
  ),
  check("country").custom((val) =>
    allOrNothingStr(REG_COUNTRY, val) ? true : Promise.reject("Invalid country")
  ),
  check("country").custom((val) =>
    allOrNothingStr(REG_STATE, val) ? true : Promise.reject("Invalid country")
  ),
  check("city").custom((val) =>
    allOrNothingStr(REG_CITY, val) ? true : Promise.reject("Invalid city")
  ),
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
      if (
        (expectedArr.includes(pair[0]) && !Array.isArray(pair[1])) ||
        (pair[1] as unknown as string[])?.some((el) => typeof el !== "string")
      )
        throw new Error("Invalid data structures of array");

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
