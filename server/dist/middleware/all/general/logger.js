import { isDev } from "../../../config/env.js";
export const __cg = (str, ...arg) => {
    if (!isDev)
        return;
    console.group(str.toUpperCase());
    for (const a of arg) {
        console.log(a);
    }
    console.groupEnd();
};
export const __cr = (req, _, next) => {
    var _a;
    __cg("start ---------------------------------------------------------------");
    __cg("url", req.originalUrl);
    __cg("method", req.method);
    __cg("access", req.headers.authorization);
    __cg("refresh", (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken);
    __cg("body", req.body);
    __cg("params", req.params);
    __cg("query", req.query);
    __cg("end ---------------------------------------------------------------");
    return next();
};
