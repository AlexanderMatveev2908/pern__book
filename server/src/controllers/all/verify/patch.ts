import { Response } from "express";
import { MsgCheckToken, ReqApp } from "../../../types/types.js";
import {
  checkCbcHmac,
  checkHMAC,
  err401,
  err404,
  err409,
  formatMsgApp,
  res200,
} from "../../../lib/lib.js";
import { User } from "../../../models/models.js";

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

  return res200(res, { msg: "account verified" });
};
