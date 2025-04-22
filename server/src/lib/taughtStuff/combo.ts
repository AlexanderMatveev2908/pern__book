import { UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { genTokenCBC } from ".././hashEncryptSign/cbcHmac.js";
import { sendEmailAuth } from ".././mail/auth.js";

export const genTokSendEmail = async ({
  user,
  event,
}: {
  user: UserInstance;
  event: TokenEventType;
}) => {
  const tokenData = await genTokenCBC({
    user,
    event,
  });

  await sendEmailAuth({
    user,
    token: tokenData!.verifyToken,
    event,
  });
};
