import { Response } from "express";
import { MsgHMAC, ReqApp } from "../../../types/types.js";
import {
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

  const result = await checkHMAC({
    user,
    token,
    event,
  });
  if (result !== MsgHMAC.OK) return err401(res, { msg: formatMsgApp(result) });

  user.isVerified = true;
  await user.save();

  return res200(res);
};
