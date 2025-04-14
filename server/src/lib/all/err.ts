import { Response } from "express";

export enum ErrAppMsgCode {
  ACCESS_EXPIRED = "ACCESS TOKEN EXPIRED",
  ACCESS_INVALID = "ACCESS_TOKEN_INVALID",
  ACCESS_NOT_PROVIDED = "ACCESS TOKEN NOT PROVIDED",

  REFRESH_EXPIRED = "REFRESH TOKEN EXPIRED",
  REFRESH_INVALID = "REFRESH TOKEN INVALID",
  REFRESH_NOT_PROVIDED = "REFRESH TOKEN NOT PROVIDED",

  NOT_ALLOWED = "USER DOES NOT HAVE PERMISSION TO PERFORM ACTION",
}

export const errApp = (res: Response, status: number, msg?: string) =>
  res.status(status).json({ ok: false, msg });

export const err400 = (res: Response, msg?: string) =>
  errApp(res, 400, msg ?? "Bad request");

export const err401 = (res: Response, msg?: string) =>
  errApp(res, 401, msg ?? "Unauthorized");

export const err403 = (res: Response, msg?: string) =>
  errApp(res, 403, msg ?? "Forbidden");

export const err404 = (res: Response, msg?: string) =>
  errApp(res, 404, msg ?? "Not found");

export const err409 = (res: Response, msg?: string) =>
  errApp(res, 409, msg ?? "Conflict");

export const err418 = (res: Response) =>
  errApp(res, 418, "I'm a teapot, I can not brew coffee");

export const err422 = (res: Response, msg?: string) =>
  errApp(res, 422, msg ?? "Unprocessable entity");

export const err429 = (res: Response, msg?: string) =>
  errApp(res, 429, msg ?? "Too many requests");

export const err500 = (res: Response, msg?: string) =>
  errApp(res, 500, msg ?? "Server was tired and take a coffee break ☕");
