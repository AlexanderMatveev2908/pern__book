import { Op } from "sequelize";
import { Token } from "../models/models.js";
import { TokenEventType } from "../types/types.js";
import { decodeExpJWT } from "./hashEncryptSign/JWT.js";

export const clearTokensById = async (id: string, args: TokenEventType[]) => {
  await Token.destroy({
    where: {
      userID: id,
      [Op.or]: [
        {
          event: {
            [Op.in]: [
              ...Object.values(TokenEventType).filter(
                (tok) => ![...args].includes(tok)
              ),
            ],
          },
        },
        {
          expiry: {
            [Op.lte]: Date.now(),
          },
        },
      ],
    },
  });
};

export const clearTokensByExpired = async (accessExp: string) => {
  const payload = decodeExpJWT(accessExp ?? "");

  await clearTokensById(payload?.id ?? "", [
    TokenEventType.VERIFY_ACCOUNT,
    TokenEventType.CHANGE_EMAIL,
  ]);
};
