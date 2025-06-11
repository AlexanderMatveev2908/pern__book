import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { __cg } from "../utils/log.js";

export const handleValidator =
  (statusCode: number) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    __cg("handleValidator", errors);

    if (!errors.isEmpty()) {
      return res.status(statusCode).json({
        errors: errors.array(),
        msg: errors.array()[0]?.msg,
        ok: false,
      });
    }

    return next();
  };
