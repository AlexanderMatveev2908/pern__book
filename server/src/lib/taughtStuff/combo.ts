import { Transaction } from "sequelize";
import { Thumb, ThumbInstance } from "../../models/all/Thumb.js";
import { Token, UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { genTokenCBC } from ".././hashEncryptSign/cbcHmac.js";
import { sendEmailAuth } from ".././mail/auth.js";
import { delCloud } from "../cloud/delete.js";
import { genTokenJWE } from "../hashEncryptSign/JWE.js";
import { genAccessJWT } from "../hashEncryptSign/JWT.js";
import { __cg } from "../utils/log.js";

export const genTokSendEmail = async ({
  user,
  event,
  newEmail,
}: {
  user: UserInstance;
  event: TokenEventType;
  newEmail?: string;
}) => {
  await Token.destroy({
    where: {
      userID: user.id,
      event,
    },
  });

  const { verifyToken } =
    (await genTokenCBC({
      user,
      event,
    })) ?? {};

  await sendEmailAuth({
    user,
    token: verifyToken as string,
    event,
    newEmail,
  });
};

export const pairTokenSession = async (user: UserInstance, t?: Transaction) => {
  const accessToken = genAccessJWT(user);
  const refreshToken = await genTokenJWE(user, t);

  return {
    accessToken,
    refreshToken,
  };
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
