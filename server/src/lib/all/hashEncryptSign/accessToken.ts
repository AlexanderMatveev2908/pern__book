import { JWTPayload } from "jose";
import { UserType } from "../../../models/models.js";
import jwt from "jsonwebtoken";
import { mySign } from "../../../config/env.js";

export interface AppJwtPayload extends JWTPayload {
  id: string;
  verified: boolean;
  role: string;
}

export const genAccessJWT = (user: UserType) =>
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

export const verifyJWT = (token: string) =>
  jwt.verify(token, mySign!) as AppJwtPayload;
