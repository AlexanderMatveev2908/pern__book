import { JWTPayload } from "jose";
import jwt from "jsonwebtoken";
import { mySign } from "../../../config/env.js";
import { UserInstance } from "../../../models/models.js";
import { expiryAccess } from "./expiryTime.js";
import { ReqApp } from "../../../types/types.js";

export interface AppJwtPayload extends JWTPayload {
  id: string;
}

export const genAccessJWT = (user: UserInstance) =>
  jwt.sign(
    {
      id: user.id,
    },
    process.env.MY_SIGN!,
    {
      expiresIn: expiryAccess,
    }
  );

export const verifyJWT = (token: string) =>
  jwt.verify(token, mySign!) as AppJwtPayload;

export const prepareHeader = (req: ReqApp) => {
  const authHeader = req.headers?.authorization;
  const accessToken = (authHeader as string)?.split(" ")[1];

  return accessToken ? accessToken : null;
};

export const decodeExpJWT = (expired: string) => jwt.decode(expired);
