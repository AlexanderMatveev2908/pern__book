import { Op } from "sequelize";
import { TokenEventType } from "../../types/types.js";
import { decodeExpJWT } from "../hashEncryptSign/JWT.js";
import { REG_ID } from "../../config/regex.js";
import { Thumb, ThumbInstance } from "../../models/all/img&video/Thumb.js";
import { delArrCloud } from "../cloud/delete.js";
import { Token } from "../../models/all/Token.js";
import { UserInstance } from "../../models/all/User.js";

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
  if (thumbs?.length) await delArrCloud(thumbs.map((thumb) => thumb.publicID));
};
