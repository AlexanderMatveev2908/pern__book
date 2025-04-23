import { Token, UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { genTokenCBC } from ".././hashEncryptSign/cbcHmac.js";
import { sendEmailAuth } from ".././mail/auth.js";

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

  const tokenData = await genTokenCBC({
    user,
    event,
  });

  await sendEmailAuth({
    user,
    token: tokenData!.verifyToken,
    event,
    newEmail,
  });
};
