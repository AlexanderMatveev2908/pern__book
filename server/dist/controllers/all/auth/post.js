var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { genAccessJWT, err409, res201, sendEmailAuth, genTokenHMAC, } from "../../../lib/lib.js";
import { TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = User.build(req.body);
    if (yield newUser.existUser())
        return err409(res, { msg: "User already exists" });
    newUser.capitalize();
    yield newUser.hashPwdUser();
    yield newUser.save();
    const accessToken = genAccessJWT(newUser);
    const { verifyToken } = yield genTokenHMAC({
        user: newUser,
        event: TokenEventType.VERIFY_ACCOUNT,
    });
    yield sendEmailAuth({
        user: newUser,
        token: verifyToken,
        event: TokenEventType.VERIFY_ACCOUNT,
    });
    return res201(res, { msg: "Account created", accessToken });
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    console.log(user);
    return res.status(200).json({ ok: true });
});
