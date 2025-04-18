import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import {
  checkJWE,
  err401,
  err404,
  genAccessJWT,
  res200,
} from "../../lib/lib.js";
import { User } from "../../models/models.js";

export const refreshToken = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;

  const result = await checkJWE(refreshToken);
  if (typeof result !== "object" || !result?.id)
    return err401(res, { msg: result });

  const user = await User.findByPk(result.id);
  if (!user) return err404(res, { msg: "user not found" });

  await user.delOldJWT();
  const accessToken = genAccessJWT(user);

  return res200(res, { accessToken });
};
