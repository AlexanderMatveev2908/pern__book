import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateEventToken } from "../sharedValidators/events.js";
import { validateIDs } from "../sharedValidators/ids.js";
import { validateVerifyToken } from "../sharedValidators/verifyToken.js";

export const validateVerify = [
  ...validateIDs,
  ...validateEventToken,
  ...validateVerifyToken,

  handleValidator(401),
];
