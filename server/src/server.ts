import "dotenv/config";
import express from "express";
import { connectDB, syncDB } from "./config/db.js";
import { doUser } from "./stuff/doSomething.js";
import { makeRelations } from "./models/relations.js";

const app = express();
const PORT = +process.env.PORT!;

const run = async () => {
  try {
    await doUser();
  } catch (err) {
    console.log(err);
  }
};

run();

const start = async () => {
  try {
    await connectDB();
    makeRelations();
    await syncDB();

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`=> server running on ${PORT}...`)
    );
  } catch (err: any) {
    console.log({
      err: err.message,
      stack: err.stack,
    });
  }
};

start();
