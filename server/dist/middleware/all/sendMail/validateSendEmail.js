import { handleValidator } from "../../../lib/lib.js";
import { validateEmail } from "../sharedValidators/validatorsUser.js";
export const validateSendEmail = [...validateEmail, handleValidator(429)];
