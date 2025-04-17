import { JWTPayload } from "jose";
import jwt from "jsonwebtoken";
import { mySign } from "../../../config/env.js";
import { UserInstance } from "../../../models/models.js";

export interface AppJwtPayload extends JWTPayload {
  id: string;
  isVerified: boolean;
  role: string;
}

export const genAccessJWT = (user: UserInstance) =>
  jwt.sign(
    {
      id: user.id,
      isVerified: user.isVerified,
      role: user.role,
    },
    process.env.MY_SIGN!,
    {
      expiresIn: "5m",
    }
  );

export const verifyJWT = (token: string) =>
  jwt.verify(token, mySign!) as AppJwtPayload;
