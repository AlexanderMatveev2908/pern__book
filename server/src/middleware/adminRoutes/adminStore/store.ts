import { check } from "express-validator";
import { REG_STORE_NAME } from "../../../config/regex.js";
import { handleValidator } from "../../../lib/middleware/handleValidator.js";
import validator from "validator";
import { validateAddress } from "../../sharedValidators/address.js";
import { UserRole } from "../../../types/types.js";
import {
  validateCommonFieldsStorePut,
  validateCommonFieldsStoreTxt,
} from "../../sharedValidators/commonFieldsStore.js";

export const validateStore = [
  check("name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Invalid length name")
    .matches(REG_STORE_NAME)
    .withMessage("Invalid name store chars"),

  check().custom((_, { req }) => {
    validateCommonFieldsStorePut(req);

    return true;
  }),

  check("categories")
    .isArray()
    .withMessage("Invalid format categories")
    .custom((val) =>
      !val?.length
        ? Promise.reject("Category not provided")
        : val?.length > 3
        ? Promise.reject("Categories too much")
        : true
    ),

  check("email").isEmail().withMessage("Invalid email format"),

  check("website").custom((val) =>
    !val?.length || (validator.isURL(val) && val?.startsWith("https"))
      ? true
      : Promise.reject("Invalid url website")
  ),

  ...validateAddress(),

  ...validateCommonFieldsStoreTxt,

  check("items").custom((val) => {
    if (!val?.length) return true;

    if (!Array.isArray(val)) throw new Error("Invalid team format");
    if (val.some((obj) => !obj?.email?.trim().length || !obj?.role))
      throw new Error("Team miss data");

    let i = 0;

    do {
      const curr = val[i];

      if (!validator.isEmail(curr.email))
        throw new Error(`Invalid email member ${i + 1}`);
      if (typeof curr?.role !== "string")
        throw new Error(`Invalid role member ${i + 1}`);
      if (
        ![UserRole.EMPLOYEE, UserRole.MANAGER].includes(
          (curr as any)?.role as UserRole
        )
      )
        throw new Error(`Invalid role member ${i + 1} 😠`);

      i++;
    } while (i < val.length);

    return true;
  }),

  handleValidator(422),
];
