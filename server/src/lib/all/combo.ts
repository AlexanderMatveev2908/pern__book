import { UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { genTokenCBC, sendEmailAuth } from "../lib.js";

export const GenTokSendEmail = async ({
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
