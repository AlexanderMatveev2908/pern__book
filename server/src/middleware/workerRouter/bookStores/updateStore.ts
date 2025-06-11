import { check } from "express-validator";
import { REG_STORE_DESC } from "../../../config/regex.js";
import {
  validateCommonFieldsStorePut,
  validateCommonFieldsStoreTxt,
} from "../../sharedValidators/stores/commonFieldsStore.js";
import { handleValidator } from "../../sharedValidators/handleValidator.js";

export const validateUpdateStore = [
  check().custom((_, { req }) => {
    validateCommonFieldsStorePut(req);

    return true;
  }),

  ...validateCommonFieldsStoreTxt,

  handleValidator(422),
];
