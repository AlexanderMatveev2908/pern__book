import { Sequelize } from "sequelize";

const seq = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: process.env.PWD_PG,
  database: "__0",
  logging: false,
  port: 5432,
});

export const connectDB = async () => await seq.authenticate();
export const syncDB = async () => await seq.sync({ force: true, alter: true });

export default seq;
