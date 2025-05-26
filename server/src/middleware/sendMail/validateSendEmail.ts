import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateEmail } from "../sharedValidators/validatorsUser.js";

export const validateSendEmail = [...validateEmail, handleValidator(422)];
