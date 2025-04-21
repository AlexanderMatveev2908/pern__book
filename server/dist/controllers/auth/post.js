var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TokenEventType } from "../../types/types.js";
import { Token, User } from "../../models/models.js";
import { Op } from "sequelize";
import { err401, err404, err409 } from "../../lib/err.js";
import { genAccessJWT, prepareHeader } from "../../lib/hashEncryptSign/JWT.js";
import { genTokenCBC } from "../../lib/hashEncryptSign/cbcHmac.js";
import { clearCookie, genTokenJWE, setCookie, } from "../../lib/hashEncryptSign/JWE.js";
import { sendEmailAuth } from "../../lib/mail/auth.js";
import { res200, res201 } from "../../lib/res.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { clearOldTokens } from "../../lib/clearData.js";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = User.build(req.body);
    let userID = null;
    if (yield newUser.existUser())
        return err409(res, { msg: "User already exists" });
    newUser.capitalize();
    yield newUser.hashPwdUser();
    userID = newUser.id;
    try {
        const accessToken = genAccessJWT(newUser);
        const tokenData = yield genTokenCBC({
            user: newUser,
            event: TokenEventType.VERIFY_ACCOUNT,
        });
        const refreshToken = yield genTokenJWE(newUser);
        yield sendEmailAuth({
            user: newUser,
            token: tokenData.verifyToken,
            event: TokenEventType.VERIFY_ACCOUNT,
        });
        setCookie(res, refreshToken);
        return res201(res, { msg: "Account created", accessToken });
    }
    catch (err) {
        if (userID)
            yield User.destroy({ where: { id: userID } });
        throw err;
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({ where: { email } });
    if (!user)
        return err404(res, { msg: "user not found" });
    const match = yield verifyPwd(user.password, password);
    if (!match)
        return err401(res, { msg: "invalid credentials" });
    const accessToken = genAccessJWT(user);
    const refreshToken = yield genTokenJWE(user);
    setCookie(res, refreshToken);
    return res.status(200).json({ msg: "login successful", accessToken });
});
export const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req;
    const accessExp = prepareHeader(req);
    clearCookie(res);
    const user = yield User.findByPk(userID !== null && userID !== void 0 ? userID : "");
    if (!userID || !user) {
        if (accessExp)
            yield clearOldTokens(accessExp);
        return res200(res, { msg: "logout successful" });
    }
    yield Token.destroy({
        where: {
            userID: user.id,
            event: {
                [Op.in]: [
                    ...Object.values(TokenEventType).filter((tok) => tok !== TokenEventType.VERIFY_ACCOUNT),
                ],
            },
        },
    });
    return res200(res, { msg: "logout successful" });
});
