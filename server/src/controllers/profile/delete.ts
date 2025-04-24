import { Response } from "express";
import { MsgCheckToken, ReqApp, TokenEventType } from "../../types/types.js";
import { Token, User, UserInstance } from "../../models/models.js";
import { Op } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { err401 } from "../../lib/responseClient/err.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";
import { clearThumb } from "../../lib/taughtStuff/combo.js";
import { clearCookie } from "../../lib/hashEncryptSign/JWE.js";

export const clearManageToken = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  await Token.destroy({
    where: {
      [Op.or]: [
        {
          userID,
          event: TokenEventType.SECURITY,
        },
        {
          userID,
          expiry: {
            [Op.lt]: Date.now(),
          },
        },
      ],
    },
  });

  return res204(res);
};

export const deleteAccount = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { token } = req.body;

  const user = (await User.findByPk(userID)) as UserInstance;

  const canProceed = await checkCbcHmac({
    user,
    event: TokenEventType.SECURITY,
    token,
  });
  if (canProceed !== MsgCheckToken.OK)
    return err401(res, { msg: formatMsgApp(canProceed) });

  await clearThumb(user);
  await Token.destroy({
    where: {
      userID: user.id,
    },
  });
  await user.destroy();

  clearCookie(res);

  return res200(res, { msg: "account deleted" });
};
