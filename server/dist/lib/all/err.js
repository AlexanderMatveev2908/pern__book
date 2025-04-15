import { isObjOk } from "./validateDataStructure.js";
export var ErrAppdataCode;
(function (ErrAppdataCode) {
    ErrAppdataCode["ACCESS_EXPIRED"] = "ACCESS TOKEN EXPIRED";
    ErrAppdataCode["ACCESS_INVALID"] = "ACCESS_TOKEN_INVALID";
    ErrAppdataCode["ACCESS_NOT_PROVIDED"] = "ACCESS TOKEN NOT PROVIDED";
    ErrAppdataCode["REFRESH_EXPIRED"] = "REFRESH TOKEN EXPIRED";
    ErrAppdataCode["REFRESH_INVALID"] = "REFRESH TOKEN INVALID";
    ErrAppdataCode["REFRESH_NOT_PROVIDED"] = "REFRESH TOKEN NOT PROVIDED";
})(ErrAppdataCode || (ErrAppdataCode = {}));
export const errApp = (res, status, data) => res.status(status).json(Object.assign(Object.assign({}, data), { ok: false }));
export const err400 = (res, data) => errApp(res, 400, isObjOk(data) ? data : { msg: "Bad request" });
export const err401 = (res, data) => errApp(res, 401, isObjOk(data) ? data : { msg: "Unauthorized" });
export const err403 = (res, data) => errApp(res, 403, isObjOk(data) ? data : { msg: "Forbidden" });
export const err404 = (res, data) => errApp(res, 404, isObjOk(data) ? data : { msg: "Not found" });
export const err409 = (res, data) => errApp(res, 409, isObjOk(data) ? data : { msg: "Conflict" });
export const err418 = (res) => errApp(res, 418, "I'm a teapot, I can not brew coffee");
export const err422 = (res, data) => errApp(res, 422, isObjOk(data) ? data : { msg: "Unprocessable entity" });
export const err429 = (res, data) => errApp(res, 429, isObjOk(data) ? data : { msg: "Too many requests" });
export const err500 = (res, data) => errApp(res, 500, isObjOk(data)
    ? data
    : { msg: "Server was tired and take a coffee break ☕" });
