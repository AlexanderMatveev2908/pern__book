var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MsgErrSession, UserRole } from "../../types/types.js";
import { User } from "../../models/models.js";
import { prepareHeader, verifyJWT, } from "../../lib/hashEncryptSign/JWT.js";
import { err400, err401, err403, handleErrAccessToken } from "../../lib/err.js";
export const verifyAccessToken = ({ isVerified = false, role = UserRole.CUSTOMER, }) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = prepareHeader(req);
    if (!accessToken)
        return err401(res, { msg: MsgErrSession.ACCESS_NOT_PROVIDED });
    try {
        const decoded = verifyJWT(accessToken);
        const user = yield User.findByPk(decoded.id);
        if (!user)
            return err400(res, { msg: "User not found" });
        if (isVerified && !user.isVerified)
            return err403(res, { msg: "User not verified" });
        const arrRoles = Object.values(UserRole);
        const indexRoles = arrRoles.indexOf(role);
        const indexUser = arrRoles.indexOf(user.role);
        if (indexUser < indexRoles)
            return err403(res, { msg: "User does does not have permission" });
        req.userID = user.id;
        return next();
    }
    catch (err) {
        return handleErrAccessToken(res, err);
    }
});
