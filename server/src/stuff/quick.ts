import { hashPwd } from "../lib/hashEncryptSign/argon.js";

export const tErr = () => {
  throw new Error("👻 error");
};

export const genPpdPwd = async () => {
  const hashed = await hashPwd("8cLS4XY!{2Wdvl4*l^4");

  console.log(hashed);
};
