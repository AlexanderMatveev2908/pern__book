var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from "sequelize";
import fs from "fs";
import { getCaDir } from "../lib/lib.js";
import { defineToken, defineUser } from "../models/models.js";
const seq = new Sequelize(process.env.URI_AIVEN, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: fs.readFileSync(getCaDir()) + "",
        },
    },
});
const User = defineUser(seq);
const Token = defineToken(seq);
const bindModels = () => {
    Token.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
    User.hasMany(Token, { foreignKey: "userId", onDelete: "CASCADE" });
};
bindModels();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield seq.authenticate(); });
const syncDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield seq.sync({ force: false, alter: true }); });
// const syncDB = async () => await seq.sync({ force: true, alter: true });
export default seq;
export { connectDB, syncDB, Token, User };
// const seq = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   username: "postgres",
//   password: process.env.PWD_PG,
//   database: "__0",
//   logging: false,
//   port: 5432,
// });
