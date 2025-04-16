import { isObjErrOk } from "./validateDataStructure.js";
export var ErrAppMsgCode;
(function (ErrAppMsgCode) {
    ErrAppMsgCode["ACCESS_EXPIRED"] = "ACCESS TOKEN EXPIRED";
    ErrAppMsgCode["ACCESS_INVALID"] = "ACCESS_TOKEN_INVALID";
    ErrAppMsgCode["ACCESS_NOT_PROVIDED"] = "ACCESS TOKEN NOT PROVIDED";
    ErrAppMsgCode["REFRESH_EXPIRED"] = "REFRESH TOKEN EXPIRED";
    ErrAppMsgCode["REFRESH_INVALID"] = "REFRESH TOKEN INVALID";
    ErrAppMsgCode["REFRESH_NOT_PROVIDED"] = "REFRESH TOKEN NOT PROVIDED";
})(ErrAppMsgCode || (ErrAppMsgCode = {}));
export const errApp = (res, status, data) => res.status(status).json(Object.assign(Object.assign({}, data), { ok: false }));
export const err400 = (res, data) => errApp(res, 400, isObjErrOk(data) ? data : { msg: "Bad request" });
export const err401 = (res, data) => errApp(res, 401, isObjErrOk(data) ? data : { msg: "Unauthorized" });
export const err403 = (res, data) => errApp(res, 403, isObjErrOk(data) ? data : { msg: "Forbidden" });
export const err404 = (res, data) => errApp(res, 404, isObjErrOk(data) ? data : { msg: "Not found" });
export const err409 = (res, data) => errApp(res, 409, isObjErrOk(data) ? data : { msg: "Conflict" });
export const err418 = (res) => errApp(res, 418, "I'm a teapot, I can not brew coffee");
export const err422 = (res, data) => errApp(res, 422, isObjErrOk(data) ? data : { msg: "Unprocessable entity" });
export const err429 = (res, data) => errApp(res, 429, isObjErrOk(data) ? data : { msg: "Too many requests" });
export const err500 = (res, data) => errApp(res, 500, isObjErrOk(data)
    ? data
    : { msg: "Server was tired and take a coffee break ☕" });
