import jwt from "jsonwebtoken";
import { mySign } from "../../config/env.js";
import { expiryAccess } from "./expiryTime.js";
export const genAccessJWT = (user) => jwt.sign({
    id: user.id,
}, process.env.MY_SIGN, {
    expiresIn: expiryAccess,
});
export const verifyJWT = (token) => jwt.verify(token, mySign);
export const prepareHeader = (req) => {
    var _a;
    const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    return accessToken ? accessToken : null;
};
export const decodeExpJWT = (expired) => jwt.decode(expired);
