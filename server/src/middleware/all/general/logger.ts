import { NextFunction, Response } from "express";
import { isDev } from "../../../config/env.js";
import { ReqApp } from "../../../types/types.js";

export const __cg = (str: string, ...arg: any[]) => {
  if (!isDev) return;

  console.group(str.toUpperCase());

  for (const a of arg) {
    console.log(a);
  }
  console.groupEnd();
};

export const __cr = (req: ReqApp, _: Response, next: NextFunction) => {
  __cg("start ---------------------------------------------------------------");

  __cg("url", req.originalUrl);

  __cg("method", req.method);

  __cg("access", req.headers.authorization);

  __cg("refresh", req.cookies?.refreshToken);

  __cg("body", req.body);

  __cg("params", req.params);

  __cg("query", req.query);

  __cg("end ---------------------------------------------------------------");

  return next();
};
