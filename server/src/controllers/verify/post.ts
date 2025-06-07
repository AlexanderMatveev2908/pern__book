import { Response } from "express";
import { MsgCheckToken, ReqApp } from "../../types/types.js";
import { err401, err404 } from "../../lib/responseClient/err.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { res200 } from "../../lib/responseClient/res.js";
import { User } from "../../models/all/User.js";

export const verifyEmailForgotPwd = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID, event, token } = req.body;

  const user = await User.findOne({ where: { id: userID } });
  if (!user) return err404(res, { msg: "user not found" });

  const result = await checkCbcHmac({
    user,
    token,
    event,
    del: false,
  });
  if (result !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(result as string) });

  return res200(res, { msg: "email verified" });
};
