import { Op } from "sequelize";
import { Token } from "../../models/models.js";
import { decodeExpJWT, PayloadJWT } from "../lib.js";
import { TokenEventType } from "../../types/types.js";

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
