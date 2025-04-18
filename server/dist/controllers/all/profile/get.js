var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { res200, res204 } from "../../../lib/lib.js";
import { User } from "../../../models/models.js";
export const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userID)
        return res204(res);
    const user = yield User.findByPk(req.userID, {
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "tempEmail"],
        },
        raw: true,
    });
    // const user = userInstance?.get({ plain: true });
    return res200(res, { user });
});
