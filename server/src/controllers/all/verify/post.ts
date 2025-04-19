import { Response } from "express";
import { ReqApp, TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";
import { err404, err409, GenTokSendEmail, res200 } from "../../../lib/lib.js";

export const sendEmailVerifyAccount = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (!user) return err404(res, { msg: "user not found" });
  if (user.isVerified) return err409(res, { msg: "user already verified" });

  await GenTokSendEmail({ user, event: TokenEventType.VERIFY_ACCOUNT });

  return res200(res, { msg: "email send successfully" });
};
