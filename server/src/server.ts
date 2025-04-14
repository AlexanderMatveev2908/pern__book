import "dotenv/config";
import express from "express";
import { connectDB, syncDB } from "./config/db.js";
import { makeRelations } from "./theorySql/models/relations.js";
import mainRouter from "./routes/route.js";
import { bindModels } from "./models/models.js";

const app = express();
const PORT = +process.env.PORT!;

// trust first proxy hop
app.set("trust proxy", 1);

app.use(express.json());

app.use("/api/v1", mainRouter);

const start = async () => {
  try {
    await connectDB();
    bindModels();
    await syncDB();

    await new Promise<void>((res, rej) => {
      app.listen(PORT, (err) => {
        if (err) rej(err);

        res();
      });
    }).then(() => console.log(`=> Server running on ${PORT}...`));
  } catch (err: any) {
    console.log({
      err: err.message,
      stack: err.stack,
    });
    process.exit(1);
  }
};

// for rejections async not handled in catch
process.on("unhandledRejection", (reason, promise) => {
  console.error("=> Unhandled Rejection:", reason);
  process.exit(1);
});
// for sync errors not handled in catch
process.on("uncaughtException", (err) => {
  console.error("=> Uncaught Exception:", err);
  process.exit(1);
});

start();
