import { Response } from "express";
import { MsgErrSession, ReqApp } from "../../types/types.js";
import {
  PayloadJWT,
  checkJWE,
  clearCookie,
  decodeExpJWT,
  err401,
  err404,
  genAccessJWT,
  PayloadJWE,
  prepareHeader,
  res200,
} from "../../lib/lib.js";
import { Token, User } from "../../models/models.js";

export const refreshToken = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;
  const accessExp = prepareHeader(req);

  if (!refreshToken) {
    clearCookie(res);

    if (!accessExp)
      return err401(res, { msg: MsgErrSession.REFRESH_NOT_PROVIDED });

    const payload = decodeExpJWT(accessExp);
    await Token.destroy({
      where: { userID: (payload as PayloadJWT)?.id ?? "" },
    });
    return err401(res, { msg: MsgErrSession.REFRESH_EXPIRED });
  }

  const result = await checkJWE(refreshToken);
  if (typeof result !== "object" || !result?.id) {
    clearCookie(res);

    if (result === MsgErrSession.REFRESH_NOT_PROVIDED)
      return err401(res, { msg: result });
  }

  const user = await User.findByPk((result as PayloadJWE).id);
  if (!user) {
    clearCookie(res);
    return err404(res, { msg: "user not found" });
  }

  await user.delOldJWT();
  const accessToken = genAccessJWT(user);

  return res200(res, { accessToken });
};
