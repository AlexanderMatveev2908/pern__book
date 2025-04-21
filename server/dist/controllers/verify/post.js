var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MsgCheckToken } from "../../types/types.js";
import { User } from "../../models/models.js";
import { err401, err404 } from "../../lib/err.js";
import { checkCbcHmac } from "../../lib/hashEncryptSign/cbcHmac.js";
import { formatMsgApp } from "../../lib/formatters.js";
import { res200 } from "../../lib/res.js";
export const verifyEmailForgotPwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, event, token } = req.body;
    const user = yield User.findOne({ where: { id: userID } });
    if (!user)
        return err404(res, { msg: "user not found" });
    const result = yield checkCbcHmac({
        user,
        token,
        event,
        del: false,
    });
    if (result !== MsgCheckToken.OK)
        return err401(res, { msg: formatMsgApp(result) });
    return res200(res, { msg: "email verified" });
});
