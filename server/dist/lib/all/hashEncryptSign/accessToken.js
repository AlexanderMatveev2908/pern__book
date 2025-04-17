import jwt from "jsonwebtoken";
import { mySign } from "../../../config/env.js";
import { expiryAccess } from "./expiryTime.js";
export const genAccessJWT = (user) => jwt.sign({
    id: user.id,
}, process.env.MY_SIGN, {
    expiresIn: expiryAccess,
});
export const verifyJWT = (token) => jwt.verify(token, mySign);
