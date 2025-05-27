import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const seq = new Sequelize(process.env.URI_AIVEN!, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

export default seq;
