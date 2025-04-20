import { NextFunction, Response } from "express";
import { MsgErrSession, ReqApp } from "../../types/types.js";
import {
  PayloadJWT,
  prepareHeader,
  verifyJWT,
} from "../../lib/hashEncryptSign/JWT.js";
import { err401, handleErrAccessToken } from "../../lib/err.js";

export const getUserID = async (
  req: ReqApp,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const accessToken = prepareHeader(req);
  const { refreshToken } = req.cookies;

  // const isLoggingOut = req.originalUrl.includes("logout");

  // if (isLoggingOut) return next();

  if (!accessToken) {
    if (!refreshToken) return next();
    else return err401(res, { msg: MsgErrSession.ACCESS_NOT_PROVIDED });
  }

  try {
    const decoded: PayloadJWT = verifyJWT(accessToken);
    req.userID = decoded.id;

    return next();
  } catch (err: any) {
    return handleErrAccessToken(res, err);
  }
};
