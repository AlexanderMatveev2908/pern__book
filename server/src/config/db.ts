import { Sequelize } from "sequelize";
import fs from "fs";
import { getCaDir } from "../lib/lib.js";
import { defineToken, defineUser } from "../models/models.js";

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

const User = defineUser(seq);
const Token = defineToken(seq);

const bindModels = () => {
  Token.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Token, { foreignKey: "userId" });
};

bindModels();

const connectDB = async () => await seq.authenticate();
const syncDB = async () => await seq.sync({ force: true, alter: true });

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
