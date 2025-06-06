import { NextFunction, Request, Response } from "express";
import { isDev } from "../../config/env.js";
import { err500 } from "../../lib/responseClient/err.js";
import { __cg } from "../../lib/utils/log.js";

export const errMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
): any => {
  if (isDev)
    __cg("err 500", {
      msg: err?.msg,
      message: err?.message,
      stack: err.stack,
    });

  return err500(res, { msg: err?.msg });
};
