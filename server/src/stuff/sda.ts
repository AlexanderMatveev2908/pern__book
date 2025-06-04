import { hashPwd } from "../lib/hashEncryptSign/argon.js";
import { User } from "../models/models.js";

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
export const makeDummyUser = async () => {
  const pwd = await hashPwd("Banana123@");

  await User.create({
    firstName: "aa",
    lastName: "mm",
    email: "banana@gmail.com",
    password: pwd,
    isVerified: true,
  });
};
