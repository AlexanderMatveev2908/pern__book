import jwt from "jsonwebtoken";
import { mySign } from "../../../config/env.js";
import { expiryAccess } from "./expiryTime.js";
export const genAccessJWT = (user) => jwt.sign({
    id: user.id,
    isVerified: user.isVerified,
    role: user.role,
}, process.env.MY_SIGN, {
    expiresIn: expiryAccess,
});
export const verifyJWT = (token) => jwt.verify(token, mySign);
