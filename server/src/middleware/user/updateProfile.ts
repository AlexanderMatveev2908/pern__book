import { check } from "express-validator";
import { validateAddress } from "../sharedValidators/address.js";
import { validateName } from "../sharedValidators/validatorsUser.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const validateProfile = [
  ...validateName,
  ...validateAddress(),

  check().custom((_, { req }) => {
    console.log(req.files);

    return true;
  }),

  handleValidator(422),
];
