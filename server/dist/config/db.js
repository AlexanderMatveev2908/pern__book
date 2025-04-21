var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { bindModels } from "../models/models.js";
import { decryptCert } from "../lib/hashEncryptSign/cbcHmac.js";
const seq = new Sequelize(process.env.URI_AIVEN, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: decryptCert(),
            // ca: fs.readFileSync(getCaDir()).toString(),
        },
    },
});
bindModels(seq);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield seq.authenticate(); });
const syncDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield seq.sync({ force: false, alter: true }); });
// const syncDB = async () => await seq.sync({ force: true, alter: true });
export { connectDB, syncDB, seq };
// const seq = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   username: "postgres",
//   password: process.env.PWD_PG,
//   database: "__0",
//   logging: false,
//   port: 5432,
// });
