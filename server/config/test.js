import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
import fs from "fs";

const client = new pg.Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  ssl: {
    ca: fs.readFileSync("certs/ca.pem").toString(),
    rejectUnauthorized: true,
  },
});

client.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected successfully");
    client.end();
  }
});
