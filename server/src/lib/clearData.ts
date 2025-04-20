import { Op } from "sequelize";
import { Token } from "../models/models.js";
import { TokenEventType } from "../types/types.js";
import { decodeExpJWT, PayloadJWT } from "./hashEncryptSign/JWT.js";

export const clearOldTokens = async (accessExp: string) => {
  const payload = decodeExpJWT(accessExp ?? "");
  await Token.destroy({
    where: {
      userID: (payload as PayloadJWT)?.id ?? "",
      event: {
        [Op.in]: [
          ...Object.values(TokenEventType).filter(
            (tok) => tok !== TokenEventType.VERIFY_ACCOUNT
          ),
        ],
      },
    },
  });
};
