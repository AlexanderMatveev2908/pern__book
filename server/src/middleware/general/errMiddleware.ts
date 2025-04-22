import { NextFunction, Request, Response } from "express";
import { err500 } from "../../lib/err.js";
import { isDev } from "../../config/env.js";

export const errMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
): any => {
  if (isDev)
    console.log({
      msg: err.msg,
      error: err.message,
      stack: err.stack,
    });

  return err500(res, { msg: err?.msg });
};
