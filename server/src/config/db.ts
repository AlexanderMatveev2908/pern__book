import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import fs from "fs";
import { calcTimeRun, getCaDir } from "../lib/utils/utils.js";
import { decryptCert, encryptCert } from "../lib/hashEncryptSign/cbcHmac.js";
import { bindModels } from "../models/all/bind/bind.js";

const seq = new Sequelize(process.env.URI_AIVEN!, {
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

const connectDB = async () => await seq.authenticate();
const syncDB = async () => seq.sync({ force: false, alter: true });
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
