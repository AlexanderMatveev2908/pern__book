import { JWTPayload } from "jose";
import { UserType } from "../../../models/models.js";
import jwt from "jsonwebtoken";

export interface AppJwtPayload extends JWTPayload {
  id: string;
  verified: boolean;
  role: string;
}

export const createTokenHMAC = (user: UserType) =>
  jwt.sign(
    {
      id: user.id,
      verified: user.isVerified,
      role: user.role,
    },
    process.env.MY_SIGN!,
    {
      expiresIn: "5m",
    }
  );

export const verifyTokenHMAC = (token: string) =>
  jwt.verify(token, process.env.MY_SIGN!) as AppJwtPayload;
