import { Response } from "express";
import { MsgCheckToken, ReqApp } from "../../types/types.js";
import { User } from "../../models/models.js";
import { res200 } from "../../lib/responseClient/res.js";
import {
  err401,
  err404,
  err409,
  err500,
} from "../../lib/responseClient/err.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { genAccessJWT } from "../../lib/hashEncryptSign/JWT.js";
import { genTokenJWE, setCookie } from "../../lib/hashEncryptSign/JWE.js";

export const verifyAccount = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { token, userID, event } = req.body;

  const user = await User.findByPk(userID, {
    include: {
      all: true,
    },
  });
  if (!user) return err404(res, { msg: "user not found" });
  if (user.isVerified) return err409(res, { msg: "user already verified" });

  const result = await checkCbcHmac({
    user,
    token,
    event,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result as string) });

  await user.verify();

  try {
    await user.clearTokens();

    const accessToken = genAccessJWT(user);
    const refreshToken = await genTokenJWE(user);

    setCookie(res, refreshToken);

    return res200(res, { msg: "account verified", accessToken });
  } catch (err: any) {
    user.isVerified = false;

    return err500(res, { msg: "error verifying user email" });
  }
};
