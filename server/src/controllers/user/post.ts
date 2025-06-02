import { Response } from "express";
import { ReqApp, TokenEventType } from "../../types/types.js";
import { Token, User, UserInstance } from "../../models/models.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { err401 } from "../../lib/responseClient/err.js";
import { genTokenCBC } from "../../lib/hashEncryptSign/cbcHmac.js";
import { res200 } from "../../lib/responseClient/res.js";

export const allowManageAccount = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { password } = req.body;

  const user = (await User.findByPk(userID)) as UserInstance;

  const isMatch = await verifyPwd(user!.password, password);
  if (!isMatch) return err401(res, { msg: "Invalid credentials" });

  await Token.destroy({
    where: {
      userID,
      event: TokenEventType.SECURITY,
    },
  });
  const { verifyToken } =
    (await genTokenCBC({
      user,
      event: TokenEventType.SECURITY,
    })) ?? {};

  return res200(res, {
    manageAccountToken: verifyToken,
    msg: "user can manage account",
  });
};
