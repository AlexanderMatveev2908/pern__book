import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateEventToken } from "../sharedValidators/events.js";
import { validateIDs } from "../sharedValidators/ids.js";

export const validateVerify = [
  ...validateIDs,
  ...validateEventToken,

  handleValidator(401),
];
