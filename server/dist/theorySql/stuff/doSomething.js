var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import Product from "../models/Product.js";
export const doUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield Product.count({ where: {} });
    const users = yield User.findAll({
        include: [
            {
                model: Product,
                as: "Products",
            },
        ],
    });
    console.log((_a = users[0]) === null || _a === void 0 ? void 0 : _a.Products);
    // const newP = await Product.create({
    //   name: "Product 1",
    //   price: 100,
    //   userId: 1,
    // });
    // const newUser = await User.create({
    //   name: "John",
    //   email: "john@example.com",
    //   password: "XXXXXXXX",
    //   role: "admin",
    // });
});
