import { handleValidator } from "../../../lib/lib.js";
import { validateIDs } from "./ids.js";
import { validateVerifyToken } from "./verifyToken.js";

export const validateChoseNewPwd = [
  ...validateIDs,
  ...validateVerifyToken,

  handleValidator(401),
];
