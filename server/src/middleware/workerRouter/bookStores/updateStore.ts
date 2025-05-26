import { check } from "express-validator";
import { REG_STORE_DESC } from "../../../config/regex.js";
import {
  validateCommonFieldsStorePut,
  validateCommonFieldsStoreTxt,
} from "../../sharedValidators/commonFieldsStore.js";
import { handleValidator } from "../../../lib/middleware/handleValidator.js";

export const validateUpdateStore = [
  check().custom((_, { req }) => {
    validateCommonFieldsStorePut(req);
  }),

  ...validateCommonFieldsStoreTxt,

  handleValidator(422),
];
