import { NextFunction, Request, Response } from "express";
import {
  AppJwtPayload,
  err400,
  err401,
  err403,
  err500,
  verifyJWT,
} from "../../../lib/lib.js";
import { ErrAppMsgCode, UserRole } from "../../../types/types.js";
import { User } from "../../../models/models.js";

export const verifyAccessToken =
  ({
    isVerified = false,
    role = UserRole.CUSTOMER,
  }: {
    isVerified?: boolean;
    role?: UserRole;
  }) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers?.authorization;

    const accessToken = (authHeader as string)?.split(" ")[1];
    if (!authHeader)
      return err401(res, { msg: ErrAppMsgCode.ACCESS_NOT_PROVIDED });

    try {
      const decoded: AppJwtPayload = verifyJWT(accessToken);

      const user = await User.findByPk(decoded.id);
      if (!user) return err400(res, { msg: "User not found" });

      if (isVerified && !decoded.isVerified)
        return err403(res, { msg: "User not verified" });

      const arrRoles = Object.values(UserRole);
      const indexRoles = arrRoles.indexOf(role);
      const indexUser = arrRoles.indexOf(decoded.role as UserRole);

      if (indexUser < indexRoles)
        return err403(res, { msg: "User does does not have permission" });

      req.user = {
        id: decoded.id,
        role: decoded.role as UserRole,
        isVerified: decoded.isVerified,
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
