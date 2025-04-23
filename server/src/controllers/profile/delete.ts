import { Response } from "express";
import { ReqApp, TokenEventType } from "../../types/types.js";
import { Token } from "../../models/models.js";
import { Op } from "sequelize";
import { res204 } from "../../lib/responseClient/res.js";

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
