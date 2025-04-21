var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { frontURL, myMail } from "../../config/env.js";
import mailer from "../../config/mail.js";
import { TokenEventType } from "../../types/types.js";
import { getHtmlMail } from "./html/template.js";
const getTxt = (event) => {
    let txt = "";
    let labelBtn = "";
    let subject = "";
    switch (event) {
        case TokenEventType.VERIFY_ACCOUNT:
            txt = "verify your account";
            labelBtn = "Verify Account";
            subject = "VERIFY ACCOUNT";
            break;
        case TokenEventType.FORGOT_PWD:
            txt = "recover your account";
            labelBtn = "Recover Account";
            subject = "RECOVER ACCOUNT";
            break;
        default:
            throw new Error(`=> Invalid event: ${event}`);
    }
    return {
        txt,
        labelBtn,
        subject,
    };
};
export const sendEmailAuth = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, token, event, }) {
    if ([user, token, event].some((el) => !el))
        throw new Error("=> Missing data mail transporter");
    const verifyURL = `${frontURL}/verify-cb?token=${token}&userID=${user.id}&event=${event}`;
    const { txt, labelBtn, subject } = getTxt(event);
    yield mailer.sendMail({
        from: myMail,
        to: user.email,
        subject,
        html: getHtmlMail({
            firstName: user.firstName,
            txt,
            url: verifyURL,
            labelBtn,
        }),
    });
});
