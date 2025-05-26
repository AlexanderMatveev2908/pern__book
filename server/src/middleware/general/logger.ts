import { NextFunction, Response } from "express";
import { isDev } from "../../config/env.js";
import { ReqApp } from "../../types/types.js";
import { __cg } from "../../lib/utils/log.js";

export const __cr = (req: ReqApp, _: Response, next: NextFunction) => {
  __cg("start ---------------------------------------------------------------");

  __cg("url", req.url);

  __cg("method", req.method);

  __cg("access", req.headers.authorization);

  __cg("refresh", req.cookies?.refreshToken);

  __cg("body", req.body);

  __cg("params", req.params);

  __cg("query", req.query);

  __cg("end ---------------------------------------------------------------");

  return next();
};
