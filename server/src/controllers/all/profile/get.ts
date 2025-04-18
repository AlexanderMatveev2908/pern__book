import { Response } from "express";
import { err401, err500, res200, res204 } from "../../../lib/lib.js";
import { ReqApp } from "../../../types/types.js";
import { User } from "../../../models/models.js";

export const getUserProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  if (!req.userID) return res204(res);

  const user = await User.findByPk(req.userID, {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "tempEmail"],
    },
    raw: true,
  });

  // const user = userInstance?.get({ plain: true });
  // return err401(res, { msg: MsgErrSession.ACCESS_INVALID });

  return res200(res, { user });
};
