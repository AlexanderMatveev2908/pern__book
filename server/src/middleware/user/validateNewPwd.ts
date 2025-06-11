import { handleValidator } from "../sharedValidators/handleValidator.js";
import { validatePassword } from "../sharedValidators/validatorsUser.js";

export const validateNewPwd = [...validatePassword, handleValidator(422)];
