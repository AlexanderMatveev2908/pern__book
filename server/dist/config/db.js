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
// const seq = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   username: "postgres",
//   password: process.env.PWD_PG,
//   database: "__0",
//   logging: false,
//   port: 5432,
// });
export default seq;
export const connectDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield seq.authenticate(); });
export const syncDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield seq.sync({ force: true, alter: true }); });
