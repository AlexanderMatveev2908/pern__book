import nodemailer from "nodemailer";
import { isDev } from "./env.js";

const optDev = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
};

const opt = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: true,
  },
};

const mailer = nodemailer.createTransport({
  ...(isDev ? optDev : opt),
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MAIL_PASS,
  },
});

export default mailer;
