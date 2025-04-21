import { check } from "express-validator";
import { validateEmail, validateName, validatePassword, } from "../sharedValidators/validatorsUser.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";
export const validateRegister = [
    ...validateName,
    ...validateEmail,
    ...validatePassword,
    check().custom((_, { req }) => req.body.email === req.body.password
        ? Promise.reject("Password must be different from email")
        : true),
    handleValidator(422),
];
