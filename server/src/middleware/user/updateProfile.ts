import { check } from "express-validator";
import { validateAddress } from "../sharedValidators/address.js";
import { validateName } from "../sharedValidators/validatorsUser.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const validateProfile = [
  check().custom((_, { req }) => {
    if (!req.file) return true;

    if (!req.file?.mimetype?.startsWith("image"))
      throw new Error("File must be an image");

    return true;
  }),

  ...validateName,
  ...validateAddress(!!1),

  handleValidator(422),
];
