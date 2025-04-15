var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../config/db.js";
export const clearDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const start = performance.now();
    yield User.destroy({ where: {} });
    const end = performance.now();
    console.log(`=> DONE ${end - start} ms`);
});
export const getDataDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.findAll();
    // await User.update(
    //   { firstName: "newName" },
    //   {
    //     where: {
    //       id: 1,
    //     },
    //   }
    // );
    console.log(users);
});
