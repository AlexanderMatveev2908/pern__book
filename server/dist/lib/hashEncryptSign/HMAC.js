// import crypto from "crypto";
// import { mySign } from "../../../config/env.js";
// import { MsgCheckToken, TokAlg, TokenEventType } from "../../../types/types.js";
// import { Token, UserInstance } from "../../../models/models.js";
export {};
// const hashHMAC = (payload: string) =>
//   crypto.createHmac(TokAlg.SHA, mySign!).update(payload).digest("hex");
// export const genTokenHMAC = async ({
//   user,
//   event,
// }: {
//   user: UserInstance;
//   event: TokenEventType;
// }): Promise<any> => {
//   const verifyToken = crypto.randomBytes(32).toString("hex");
//   const payload = `${user.id}_${verifyToken}`;
//   const hashed = hashHMAC(payload);
//   const expiry = Date.now() + 1000 * 60 * 15;
//   const MAX_ATTEMPTS = 10;
//   let attempt = 0;
//   do {
//     try {
//       await Token.create({
//         event,
//         hashed,
//         expiry,
//         userID: user.id,
//       });
//       return { verifyToken };
//     } catch (err: any) {
//       if (err.name === "SequelizeUniqueConstraintError") {
//         attempt++;
//         if (attempt === MAX_ATTEMPTS) throw new Error("Unable to create token");
//       } else {
//         throw err;
//       }
//     }
//   } while (attempt < MAX_ATTEMPTS);
// };
// // export const genTokenHMAC = async ({
// //   user,
// //   event,
// // }: {
// //   user: UserInstance;
// //   event: TokenEventType;
// // }): Promise<any> => {
// //   const token = crypto.randomBytes(32).toString("hex");
// //   const payload = `${user.id}_${token}`;
// //   const hashed = hashHMAC(payload);
// //   const expiry = Date.now() + 1000 * 60 * 15;
// //   try {
// //     const newToken = await Token.create({
// //       type: event,
// //       hashed,
// //       expiry,
// //       userId: user.id,
// //     });
// //   } catch (err) {
// //     return await genTokenHMAC({ user, event });
// //   }
// //   return { token };
// // };
// export const checkHMAC = async ({
//   user,
//   token,
//   event,
// }: {
//   user: UserInstance;
//   token: string;
//   event: TokenEventType;
// }) => {
//   const payload = `${user.id}_${token}`;
//   const hashed = hashHMAC(payload);
//   const existingToken = await Token.findOne({
//     where: {
//       hashed,
//       event,
//       userID: user.id,
//     },
//   });
//   if (!existingToken) return MsgCheckToken.INVALID;
//   if (!existingToken.hashed) {
//     await existingToken.destroy();
//     return MsgCheckToken.NOT_EMITTED;
//   }
//   if ((existingToken?.expiry ?? 0) < Date.now()) {
//     await existingToken.destroy();
//     return MsgCheckToken.EXPIRED;
//   }
//   await existingToken.destroy();
//   return MsgCheckToken.OK;
// };
