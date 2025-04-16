import { Sequelize } from "sequelize";
import fs from "fs";
import { getCaDir } from "../lib/lib.js";
import { bindModels } from "../models/models.js";

const seq = new Sequelize(process.env.URI_AIVEN!, {
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

bindModels(seq);

const connectDB = async () => await seq.authenticate();
const syncDB = async () => await seq.sync({ force: false, alter: true });
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
