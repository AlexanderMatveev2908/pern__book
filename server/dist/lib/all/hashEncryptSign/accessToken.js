import jwt from "jsonwebtoken";
export const createTokenHMAC = (user) => jwt.sign({
    id: user.id,
    role: user.role,
}, process.env.MY_SIGN, {
    expiresIn: "5m",
});
export const verifyTokenHMAC = (token) => jwt.verify(token, process.env.MY_SIGN);
