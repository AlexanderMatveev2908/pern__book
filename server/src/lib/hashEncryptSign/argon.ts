import argon2 from "argon2";

export const hashPwd = async (pwd: string) =>
  await argon2.hash(pwd, {
    parallelism: 2,
    memoryCost: 1024 * 32,
    timeCost: 2,
    type: argon2.argon2id,
  });
// await argon2.hash(pwd, {
//   parallelism: 4,
//   memoryCost: 1024 * 256,
//   timeCost: 10,
//   type: argon2.argon2id,
// });

export const verifyPwd = async (hash: string, pwd: string) =>
  await argon2.verify(hash, pwd);
