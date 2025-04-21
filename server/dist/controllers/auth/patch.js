var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MsgCheckToken, TokenEventType } from "../../types/types.js";
import { User } from "../../models/models.js";
import { err400, err401, err404 } from "../../lib/err.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/formatters.js";
import { genTokenJWE, setCookie } from "../../lib/hashEncryptSign/JWE.js";
import { genAccessJWT } from "../../lib/hashEncryptSign/JWT.js";
import { res200 } from "../../lib/res.js";
export const choseNewPwdForgotOld = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, token, password: newPwd } = req.body;
    const user = yield User.findByPk(userID);
    if (!user)
        return err404(res, "user not found");
    if (user.email === newPwd)
        return err400(res, { msg: "email must be different from password" });
    const isOldPwd = yield verifyPwd(user.password, newPwd);
    if (isOldPwd)
        return err400(res, {
            msg: "new password must be different from old password",
        });
    const result = yield checkCbcHmac({
        user,
        token,
        event: TokenEventType.FORGOT_PWD,
    });
    if (result !== MsgCheckToken.OK)
        return err401(res, { msg: formatMsgApp(result) });
    user.password = newPwd;
    yield user.hashPwdUser();
    const refreshToken = yield genTokenJWE(user);
    const accessToken = yield genAccessJWT(user);
    setCookie(res, refreshToken);
    return res200(res, { msg: "new password saved", accessToken });
});
