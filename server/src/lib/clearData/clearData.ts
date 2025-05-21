import { Op } from "sequelize";
import { Token, UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { decodeExpJWT } from "../hashEncryptSign/JWT.js";
import { REG_ID } from "../../config/regex.js";
import { delCloud } from "../cloud/delete.js";
import { Thumb, ThumbInstance } from "../../models/all/img&video/Thumb.js";
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
  const thumbs: ThumbInstance[] = await Thumb.findAll({
    where: {
      userID: user.id,
    },
  });
  if (thumbs?.length) {
    try {
      await Promise.all(
        thumbs.map(async (el) => {
          await delCloud(el.publicID);
          await el.destroy();
        })
      );
    } catch (err) {
      __cg("err cloud", err);
    }
  }
};
