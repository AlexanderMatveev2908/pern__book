var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MsgErrSession } from "../../types/types.js";
import { checkJWE, clearCookie, err401, err404, genAccessJWT, prepareHeader, res200, clearOldTokens, } from "../../lib/lib.js";
import { User } from "../../models/models.js";
const fail = (res, accessExp) => __awaiter(void 0, void 0, void 0, function* () {
    clearCookie(res);
    if (accessExp)
        yield clearOldTokens(accessExp);
});
export const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { refreshToken } = req.cookies;
    const accessExp = prepareHeader(req);
    if (!refreshToken) {
        yield fail(res, accessExp);
        if (!accessExp)
            return err401(res, { msg: MsgErrSession.REFRESH_NOT_PROVIDED });
        return err401(res, { msg: MsgErrSession.REFRESH_EXPIRED });
    }
    const result = yield checkJWE(refreshToken);
    if (typeof result !== "object" || !(result === null || result === void 0 ? void 0 : result.id)) {
        yield fail(res, accessExp);
        return err401(res, { msg: result });
    }
    const user = yield User.findByPk((_a = result.id) !== null && _a !== void 0 ? _a : "");
    if (!user) {
        yield fail(res, accessExp);
        return err404(res, { msg: "user not found" });
    }
    const accessToken = genAccessJWT(user);
    return res200(res, { accessToken });
});
