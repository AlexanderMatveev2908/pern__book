import crypto from "crypto";
import { Token, TokenType, UserType } from "../../../models/models.js";
import { mySign } from "../../../config/env.js";
import { MsgHMAC, TokenEventType } from "../../../types/types.js";

const hashHMAC = (payload: string) =>
  crypto.createHmac("sha256", mySign!).update(payload).digest("hex");

export const genTokenHMAC = async ({
  user,
  event,
}: {
  user: UserType;
  event: TokenEventType;
}) => {
  const token = crypto.randomBytes(32).toString("hex");
  const payload = `${user.id}_${token}`;

  const hashed = hashHMAC(payload);
  const expiry = Date.now() + 1000 * 60 * 15;

  await Token.create({
    type: event,
    hashed,
    expiry,
    userId: user.id,
  });

  return { token };
};

export const checkHMAC = async ({
  token,
  event,
}: {
  token: string;
  event: TokenEventType;
}) => {
  const hashed = hashHMAC(token);

  const existingToken = (await Token.findOne({
    where: {
      hashed,
      type: event,
    },
  })) as TokenType;

  if (!existingToken) return MsgHMAC.NOT_FOUND;
  if (!existingToken.hashed) return MsgHMAC.NOT_EMITTED;
  if ((existingToken?.expiry ?? 0) < Date.now()) return MsgHMAC.EXPIRED;

  return MsgHMAC.OK;
};
