import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateVerifyToken } from "../sharedValidators/verifyToken.js";

export const checkSecurityToken = [
  ...validateVerifyToken,

  handleValidator(401),
];
