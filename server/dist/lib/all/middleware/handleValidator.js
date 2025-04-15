import { validationResult } from "express-validator";
export const handleValidator = (statusCode) => (req, res, next) => {
    var _a;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode).json({
            errors: errors.array(),
            msg: (_a = errors.array()[0]) === null || _a === void 0 ? void 0 : _a.msg,
            ok: false,
        });
    }
    return next();
};
