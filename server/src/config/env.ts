import dotenv from "dotenv";
dotenv.config();

export const isDev = process.env.MODE === "development";

export const frontURL = isDev
  ? process.env.FRONT_URL_DEV
  : process.env.FRONT_URL;

export const myMail = process.env.MY_EMAIL;

export const mySign = process.env.MY_SIGN;

export const keyCert = process.env.KEY_CERT;
export const myIv = process.env.MY_IV;
export const myCert = process.env.CERT;
