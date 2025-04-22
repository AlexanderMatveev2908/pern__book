import { NextFunction, Request, Response } from "express";
import { MsgErrSession, ReqApp, UserRole } from "../../types/types.js";
import { User } from "../../models/models.js";
import {
  PayloadJWT,
  prepareHeader,
  verifyJWT,
} from "../../lib/hashEncryptSign/JWT.js";
import {
  err400,
  err401,
  err403,
  handleErrAccessToken,
} from "../../lib/responseClient/err.js";

export const verifyAccessToken =
  ({
    isVerified = false,
    role = UserRole.CUSTOMER,
  }: {
    isVerified?: boolean;
    role?: UserRole;
  }): any =>
  async (req: ReqApp, res: Response, next: NextFunction): Promise<any> => {
    const accessToken = prepareHeader(req);

    if (!accessToken)
      return err401(res, { msg: MsgErrSession.ACCESS_NOT_PROVIDED });

    try {
      const decoded: PayloadJWT = verifyJWT(accessToken);

      const user = await User.findByPk(decoded.id);
      if (!user) return err400(res, { msg: "User not found" });

      if (isVerified && !user.isVerified)
        return err403(res, { msg: "User not verified" });

      const arrRoles = Object.values(UserRole);
      const indexRoles = arrRoles.indexOf(role);
      const indexUser = arrRoles.indexOf(user.role as UserRole);

      if (indexUser < indexRoles)
        return err403(res, { msg: "User does does not have permission" });

      req.userID = user.id;
      return next();
    } catch (err: any) {
      return handleErrAccessToken(res, err);
    }
  };
