import jwt from "jsonwebtoken";
import { mySign } from "../../../config/env.js";
export const genAccessJWT = (user) => jwt.sign({
    id: user.id,
    verified: user.isVerified,
    role: user.role,
}, process.env.MY_SIGN, {
    expiresIn: "5m",
});
export const verifyJWT = (token) => jwt.verify(token, mySign);
