import { Response } from "express";
import { MsgErrSession, ReqApp } from "../../types/types.js";
import {
  checkJWE,
  clearCookie,
  err401,
  err404,
  genAccessJWT,
  PayloadJWE,
  prepareHeader,
  res200,
  clearOldTokens,
} from "../../lib/lib.js";
import { User } from "../../models/models.js";

const fail = async (res: Response, accessExp?: string | null) => {
  clearCookie(res);
  if (accessExp) await clearOldTokens(accessExp);
};

export const refreshToken = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;
  const accessExp = prepareHeader(req);

  if (!refreshToken) {
    await fail(res, accessExp);

    if (!accessExp)
      return err401(res, { msg: MsgErrSession.REFRESH_NOT_PROVIDED });

    return err401(res, { msg: MsgErrSession.REFRESH_EXPIRED });
  }

  const result = await checkJWE(refreshToken);
  if (typeof result !== "object" || !result?.id) {
    await fail(res, accessExp);

    return err401(res, { msg: result });
  }

  const user = await User.findByPk((result as PayloadJWE).id ?? "");
  if (!user) {
    await fail(res, accessExp);

    return err404(res, { msg: "user not found" });
  }

  const accessToken = genAccessJWT(user);

  return res200(res, { accessToken });
};
