var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "path";
import { fileURLToPath } from "url";
export const calcTimeRun = (cb) => __awaiter(void 0, void 0, void 0, function* () {
    const start = performance.now();
    const res = yield cb();
    const end = performance.now();
    console.log(`=> DONE ${end - start} md`);
    return res;
});
export const capChar = (txt) => { var _a; return ((_a = txt.at(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + txt.slice(1); };
export const getDir = () => path.join(path.dirname(fileURLToPath(import.meta.url)), "../../");
export const getDirClient = () => path.join(getDir(), "../../../../client/dist/index.html");
export const getCaDir = () => path.join(getDir(), "../certs/ca.pem");
