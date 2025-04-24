import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateIDs } from "../sharedValidators/ids.js";
import { validatePassword } from "../sharedValidators/validatorsUser.js";
import { validateVerifyToken } from "../sharedValidators/verifyToken.js";

export const validateChoseNewPwd = [
  ...validateIDs,
  ...validateVerifyToken,
  handleValidator(401),

  ...validatePassword,
  handleValidator(422),
];
