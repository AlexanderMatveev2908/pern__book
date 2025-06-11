import { handleValidator } from "../sharedValidators/handleValidator.js";
import { validateVerifyToken } from "../sharedValidators/verifyToken.js";

export const checkSecurityToken = [
  ...validateVerifyToken,

  handleValidator(401),
];
