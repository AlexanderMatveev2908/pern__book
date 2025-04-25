import { Op } from "sequelize";
import { Token, UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { decodeExpJWT } from "../hashEncryptSign/JWT.js";
import { REG_ID } from "../../config/regex.js";
import { delCloud } from "../cloud/delete.js";
import { Thumb, ThumbInstance } from "../../models/all/Thumb.js";
import { __cg } from "../utils/log.js";

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

  if (REG_ID.test(payload?.id ?? ""))
    await clearTokensById(payload.id, [
      TokenEventType.VERIFY_ACCOUNT,
      TokenEventType.CHANGE_EMAIL,
    ]);
};

export const clearThumb = async (user: UserInstance): Promise<void> => {
  const thumb: ThumbInstance | null = await Thumb.findOne({
    where: {
      userID: user.id,
    },
  });
  if (thumb) {
    try {
      await delCloud(thumb.publicID);
      await thumb.destroy();
    } catch (err) {
      __cg("err cloud", err);
    }
  }
};
