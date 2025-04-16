import { Response } from "express";
import { isObjErrOk } from "./validateDataStructure.js";

export enum ErrAppMsgCode {
  ACCESS_EXPIRED = "ACCESS TOKEN EXPIRED",
  ACCESS_INVALID = "ACCESS_TOKEN_INVALID",
  ACCESS_NOT_PROVIDED = "ACCESS TOKEN NOT PROVIDED",

  REFRESH_EXPIRED = "REFRESH TOKEN EXPIRED",
  REFRESH_INVALID = "REFRESH TOKEN INVALID",
  REFRESH_NOT_PROVIDED = "REFRESH TOKEN NOT PROVIDED",
}

export const errApp = (res: Response, status: number, data?: any) =>
  res.status(status).json({ ...data, ok: false });

export const err400 = (res: Response, data?: any) =>
  errApp(res, 400, isObjErrOk(data) ? data : { msg: "Bad request" });

export const err401 = (res: Response, data?: any) =>
  errApp(res, 401, isObjErrOk(data) ? data : { msg: "Unauthorized" });

export const err403 = (res: Response, data?: any) =>
  errApp(res, 403, isObjErrOk(data) ? data : { msg: "Forbidden" });

export const err404 = (res: Response, data?: any) =>
  errApp(res, 404, isObjErrOk(data) ? data : { msg: "Not found" });

export const err409 = (res: Response, data?: any) =>
  errApp(res, 409, isObjErrOk(data) ? data : { msg: "Conflict" });

export const err418 = (res: Response) =>
  errApp(res, 418, "I'm a teapot, I can not brew coffee");

export const err422 = (res: Response, data?: any) =>
  errApp(res, 422, isObjErrOk(data) ? data : { msg: "Unprocessable entity" });

export const err429 = (res: Response, data?: any) =>
  errApp(res, 429, isObjErrOk(data) ? data : { msg: "Too many requests" });

export const err500 = (res: Response, data?: any) =>
  errApp(
    res,
    500,
    isObjErrOk(data)
      ? data
      : { msg: "Server was tired and take a coffee break ☕" }
  );
