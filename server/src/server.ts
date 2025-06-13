import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB, syncDB } from "./config/db.js";
import { isDev } from "./config/env.js";
import routerApp from "./routes/route.js";
import { getDirClient } from "./lib/utils/utils.js";
import { errMiddleware } from "./middleware/general/errMiddleware.js";
import path from "path";
import cookieParser from "cookie-parser";
import { corsMid } from "./middleware/general/cors.js";
import http from "http";
import { clearDB } from "./stuff/clear.js";
import { populateDB } from "./stuff/populateDB.js";
import routerWebhook from "./routes/webHooks.js";

const app = express();
const PORT = process.env.PORT ? +process.env.PORT : 3000;

const server = http.createServer(app);

app.set("trust proxy", true);

app.use("/api/v1/webhooks", routerWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMid());

app.use("/api/v1", routerApp);

if (!isDev) {
  app.use(express.static(getDirClient()));

  app.get("/*dummy_express", (_, res) => {
    res.sendFile(path.resolve(getDirClient(), "index.html"));
  });
}
app.use(errMiddleware);

const start = async () => {
  try {
    await connectDB();

    // await clearDB();

    // await syncDB();

    await new Promise<void>((res, rej) => {
      server.listen(PORT, "0.0.0.0", () => {
        console.log(`=> Server listening on port ${PORT} 👻`);
        res();
      });

      server.on("error", rej);
    });
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
