import { Response } from "express";
import { res200, res204 } from "../../../lib/lib.js";
import { ReqApp } from "../../../types/types.js";
import { User } from "../../../models/models.js";

export const getUserProfile = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  if (!req.userID) return res204(res);

  const user = await User.findByPk(req.userID, {
    attributes: {
      exclude: ["password"],
    },
    raw: true,
  });
  // const user = userInstance?.get({ plain: true });

  return res200(res, { user });
};
