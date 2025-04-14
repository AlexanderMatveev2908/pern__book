import { UserType } from "../../../models/models.js";
import jwt from "jsonwebtoken";

export const createTokenHMAC = (user: UserType) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.MY_SIGN!,
    {
      expiresIn: "5m",
    }
  );

export const verifyTokenHMAC = (token: string) =>
  jwt.verify(token, process.env.MY_SIGN!);
