var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import crypto from "crypto";
import { mySign } from "../../../config/env.js";
import { MsgCheckToken, TokAlg } from "../../../types/types.js";
import { Token } from "../../../models/models.js";
const hashHMAC = (payload) =>
  crypto.createHmac(TokAlg.SHA, mySign).update(payload).digest("hex");
export const genTokenHMAC = (_a) =>
  __awaiter(void 0, [_a], void 0, function* ({ user, event }) {
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const payload = `${user.id}_${verifyToken}`;
    const hashed = hashHMAC(payload);
    const expiry = Date.now() + 1000 * 60 * 15;
    const MAX_ATTEMPTS = 10;
    let attempt = 0;
    do {
      try {
        yield Token.create({
          event,
          hashed,
          expiry,
          userID: user.id,
        });
        return { verifyToken };
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          attempt++;
          if (attempt === MAX_ATTEMPTS)
            throw new Error("Unable to create token");
        } else {
          throw err;
        }
      }
    } while (attempt < MAX_ATTEMPTS);
  });
// export const genTokenHMAC = async ({
//   user,
//   event,
// }: {
//   user: UserInstance;
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
export const checkHMAC = (_a) =>
  __awaiter(void 0, [_a], void 0, function* ({ user, token, event }) {
    var _b;
    const payload = `${user.id}_${token}`;
    const hashed = hashHMAC(payload);
    const existingToken = yield Token.findOne({
      where: {
        hashed,
        event,
        userID: user.id,
      },
    });
    if (!existingToken) return MsgCheckToken.NOT_FOUND;
    if (!existingToken.hashed) {
      yield existingToken.destroy();
      return MsgCheckToken.NOT_EMITTED;
    }
    if (
      ((_b =
        existingToken === null || existingToken === void 0
          ? void 0
          : existingToken.expiry) !== null && _b !== void 0
        ? _b
        : 0) < Date.now()
    ) {
      yield existingToken.destroy();
      return MsgCheckToken.EXPIRED;
    }
    yield existingToken.destroy();
    return MsgCheckToken.OK;
  });
