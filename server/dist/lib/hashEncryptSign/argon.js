var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import argon2 from "argon2";
export const hashPwd = (pwd) => __awaiter(void 0, void 0, void 0, function* () {
    return yield argon2.hash(pwd, {
        parallelism: 2,
        memoryCost: 1024 * 50,
        timeCost: 3,
        type: argon2.argon2id,
    });
});
// await argon2.hash(pwd, {
//   parallelism: 4,
//   memoryCost: 1024 * 256,
//   timeCost: 10,
//   type: argon2.argon2id,
// });
export const verifyPwd = (hash, pwd) => __awaiter(void 0, void 0, void 0, function* () { return yield argon2.verify(hash, pwd); });
