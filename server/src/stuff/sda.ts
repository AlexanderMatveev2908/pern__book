import { User } from "../models/models.js";

export const createUserSDA = async () => {
  await User.create({
    firstName: "SDA",
    lastName: "Frontend",
    email: "frontend.sda@gmail.com",
    password: "SdaRo46@",
  });
};
