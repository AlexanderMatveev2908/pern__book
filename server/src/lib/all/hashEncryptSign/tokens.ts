import crypto from "crypto";
import { mySign } from "../../../config/env.js";
import {
  MsgHMAC,
  TokenEventType,
  TokenType,
  UserType,
} from "../../../types/types.js";
import { Token } from "../../../config/db.js";

const hashHMAC = (payload: string) =>
  crypto.createHmac("sha256", mySign!).update(payload).digest("hex");

export const genTokenHMAC = async ({
  user,
  event,
}: {
  user: UserType;
  event: TokenEventType;
}): Promise<any> => {
  const verifyToken = crypto.randomBytes(32).toString("hex");
  const payload = `${user.id}_${verifyToken}`;

  const hashed = hashHMAC(payload);
  const expiry = Date.now() + 1000 * 60 * 15;

  const MAX_ATTEMPTS = 10;
  let attempt = 0;

  do {
    try {
      await Token.create({
        event,
        hashed,
        expiry,
        userId: user.id,
      });

      return { verifyToken };
    } catch (err: any) {
      if (err.name === "SequelizeUniqueConstraintError") {
        attempt++;

        if (attempt === MAX_ATTEMPTS) throw new Error("Unable to create token");
      } else {
        throw err;
      }
    }
  } while (attempt < MAX_ATTEMPTS);
};
// export const genTokenHMAC = async ({
//   user,
//   event,
// }: {
//   user: UserType;
//   event: TokenEventType;
// }): Promise<any> => {
//   const token = crypto.randomBytes(32).toString("hex");
//   const payload = `${user.id}_${token}`;

//   const hashed = hashHMAC(payload);
//   const expiry = Date.now() + 1000 * 60 * 15;

//   try {
//     const newToken = await Token.create({
//       type: event,
//       hashed,
//       expiry,
//       userId: user.id,
//     });
//   } catch (err) {
//     return await genTokenHMAC({ user, event });
//   }

//   return { token };
// };

export const checkHMAC = async ({
  user,
  token,
  event,
}: {
  user: UserType;
  token: string;
  event: TokenEventType;
}) => {
  const hashed = hashHMAC(token);

  const existingToken = (await Token.findOne({
    where: {
      hashed,
      event,
      userId: user.id,
    },
  })) as TokenType;

  if (!existingToken) return MsgHMAC.NOT_FOUND;
  if (!existingToken.hashed) {
    await existingToken.destroy();
    return MsgHMAC.NOT_EMITTED;
  }
  if ((existingToken?.expiry ?? 0) < Date.now()) {
    await existingToken.destroy();
    return MsgHMAC.EXPIRED;
  }

  await existingToken.destroy();
  return MsgHMAC.OK;
};
