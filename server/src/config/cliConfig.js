import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    url: process.env.URI_AIVEN,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync("certs/ca.pem").toString(),
      },
    },
  },
};
