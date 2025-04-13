import "dotenv/config";
import express from "express";
import { connectDB, syncDB } from "./config/db.js";
import { makeRelations } from "./theorySql/models/relations.js";

const app = express();
const PORT = +process.env.PORT!;

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
