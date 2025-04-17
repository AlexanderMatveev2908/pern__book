var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { genAccessJWT, err409, res201, sendEmailAuth, genTokenJWE, setCookie, genTokenCBC, } from "../../../lib/lib.js";
import { TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = User.build(req.body);
    let userID = null;
    if (yield newUser.existUser())
        return err409(res, { msg: "User already exists" });
    newUser.capitalize();
    yield newUser.hashPwdUser();
    yield newUser.save();
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
    const user = req.body;
    return res.status(200).json({ ok: true });
});
