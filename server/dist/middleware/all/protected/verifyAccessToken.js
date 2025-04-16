var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { err400, err401, err403, err500, ErrAppMsgCode, verifyJWT, } from "../../../lib/lib.js";
import { UserRole } from "../../../types/types.js";
import { User } from "../../../models/models.js";
export const verifyAccessToken = ({ verified = false, role = UserRole.CUSTOMER, }) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!authHeader)
        return err401(res, { msg: ErrAppMsgCode.ACCESS_NOT_PROVIDED });
    try {
        const decoded = verifyJWT(accessToken);
        const user = yield User.findByPk(decoded.id);
        if (!user)
            return err400(res, { msg: "User not found" });
        if (verified && !decoded.verified)
            return err403(res, { msg: "User not verified" });
        const arrRoles = Object.values(UserRole);
        const indexRoles = arrRoles.indexOf(role);
        const indexUser = arrRoles.indexOf(decoded.role);
        if (indexUser < indexRoles)
            return err403(res, { msg: "User does does not have permission" });
        req.user = {
            id: decoded.id,
            role: decoded.role,
            verified: decoded.verified,
        };
        return next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError")
            return err401(res, { msg: ErrAppMsgCode.ACCESS_EXPIRED });
        else if (err.name === "JsonWebTokenError")
            return err401(res, { msg: ErrAppMsgCode.ACCESS_INVALID });
        else
            return err500(res);
    }
});
