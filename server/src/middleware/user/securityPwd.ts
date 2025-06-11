import { handleValidator } from "../sharedValidators/handleValidator.js";
import { validatePassword } from "../sharedValidators/validatorsUser.js";

export const validatePwd = [...validatePassword, handleValidator(401)];
