import { Response } from "express";
import { MsgErrSession, ReqApp } from "../types/types.js";
import {
  checkJWE,
  clearCookie,
  PayloadJWE,
} from "../lib/hashEncryptSign/JWE.js";
import { clearTokensByExpired } from "../lib/clearData/clearData.js";
import { genAccessJWT, prepareHeader } from "../lib/hashEncryptSign/JWT.js";
import { err401, err404 } from "../lib/responseClient/err.js";
import { res200 } from "../lib/responseClient/res.js";
import { User } from "../models/all/User.js";

const fail = async (res: Response, accessExp?: string | null) => {
  clearCookie(res);
  if (accessExp) await clearTokensByExpired(accessExp);
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
