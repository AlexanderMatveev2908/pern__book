import { hashPwd } from "../lib/hashEncryptSign/argon.js";
import { User } from "../models/all/User.js";

export const createUserSDA = async () => {
  const pwd = await hashPwd("SdaRo46@");

  await User.create({
    firstName: "SDA",
    lastName: "Frontend",
    email: "frontend.sda@gmail.com",
    password: pwd,
    isVerified: true,
  });
};
