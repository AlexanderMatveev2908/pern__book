import { err500 } from "../../../lib/all/err.js";
export const errMiddleware = (err, _, res, __) => {
    var _a;
    console.log({
        error: err.message,
        stack: err.stack,
    });
    return err500(res, { msg: (_a = err === null || err === void 0 ? void 0 : err.msg) !== null && _a !== void 0 ? _a : err === null || err === void 0 ? void 0 : err.message });
};
