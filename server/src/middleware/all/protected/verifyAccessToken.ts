import { NextFunction, Request, Response } from "express";
import {
  AppJwtPayload,
  err400,
  err401,
  err403,
  err500,
  ErrAppMsgCode,
  verifyTokenHMAC,
} from "../../../lib/lib.js";
import { User, UserRole } from "../../../models/models.js";

export const verifyAccessToken =
  ({
    verified = false,
    role = UserRole.CUSTOMER,
  }: {
    verified?: boolean;
    role?: UserRole;
  }) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;

    const accessToken = (authHeader as string)?.split(" ")[1];
    if (!authHeader)
      return err401(res, { msg: ErrAppMsgCode.ACCESS_NOT_PROVIDED });

    try {
      const decoded: AppJwtPayload = verifyTokenHMAC(accessToken);

      const user = await User.findByPk(decoded.id);
      if (!user) return err400(res, { msg: "User not found" });

      if (verified && !decoded.verified)
        return err403(res, { msg: "User not verified" });

      const arrRoles = Object.values(UserRole);
      const indexRoles = arrRoles.indexOf(role);
      const indexUser = arrRoles.indexOf(decoded.role as UserRole);

      if (indexUser < indexRoles)
        return err403(res, { msg: "User does does not have permission" });

      req.user = {
        id: decoded.id,
        role: decoded.role as UserRole,
        verified: decoded.verified,
      };
      return next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError")
        return err401(res, { msg: ErrAppMsgCode.ACCESS_EXPIRED });
      else if (err.name === "JsonWebTokenError")
        return err401(res, { msg: ErrAppMsgCode.ACCESS_INVALID });
      else return err500(res);
    }
  };
