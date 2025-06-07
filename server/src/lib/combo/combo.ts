import { Transaction } from "sequelize";
import { TokenEventType } from "../../types/types.js";
import { genTokenCBC } from "../hashEncryptSign/cbcHmac.js";
import { sendEmailAuth } from "../mail/auth.js";
import { genTokenJWE } from "../hashEncryptSign/JWE.js";
import { genAccessJWT } from "../hashEncryptSign/JWT.js";
import { UserInstance } from "../../models/all/User.js";
import { Token } from "../../models/all/Token.js";

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
