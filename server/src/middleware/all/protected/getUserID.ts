import { NextFunction, Response } from "express";
import { ReqApp } from "../../../types/types.js";
import {
  AppJwtPayload,
  handleErrAccessToken,
  verifyJWT,
} from "../../../lib/lib.js";

export const getUserID = async (
  req: ReqApp,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers?.authorization;
  const accessToken = (authHeader as string)?.split(" ")[1];
  const { refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) return next();

  try {
    const decoded: AppJwtPayload = verifyJWT(accessToken);
    req.userID = decoded.id;

    return next();
  } catch (err: any) {
    return handleErrAccessToken(res, err);
  }
};
