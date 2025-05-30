import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validatePassword } from "../sharedValidators/validatorsUser.js";

export const validatePwd = [...validatePassword, handleValidator(401)];
