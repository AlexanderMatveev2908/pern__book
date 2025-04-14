import argon2 from "argon2";

export const hashPwd = async (pwd: string) => await argon2.hash(pwd);

export const verifyPwd = async (pwd: string, hash: string) =>
  await argon2.verify(hash, pwd);
