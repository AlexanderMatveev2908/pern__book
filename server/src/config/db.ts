import { Sequelize } from "sequelize";
import fs from "fs";
import { getCaDir } from "../lib/lib.js";

const seq = new Sequelize(process.env.URI_AIVEN!, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
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

export const connectDB = async () => await seq.authenticate();
export const syncDB = async () => await seq.sync({ force: false, alter: true });

export default seq;
