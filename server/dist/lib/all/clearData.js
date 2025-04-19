var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Token } from "../../models/models.js";
import { decodeExpJWT } from "../lib.js";
export const clearOldTokens = (accessExp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = decodeExpJWT(accessExp !== null && accessExp !== void 0 ? accessExp : "");
    yield Token.destroy({
        where: { userID: (_a = payload === null || payload === void 0 ? void 0 : payload.id) !== null && _a !== void 0 ? _a : "" },
    });
});
