import { handleValidator } from "../../../lib/lib.js";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../sharedValidators/validatorsUser.js";

export const validateRegister = [
  ...validateName,
  ...validateEmail,
  ...validatePassword,

  handleValidator(400),
];
