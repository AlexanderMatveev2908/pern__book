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

const app = express();
const PORT = +process.env.PORT! || 3000;

app.set("trust proxy", 1);

const server = http.createServer(app);
// const io = new Server(server, {
//   transports: ["websocket"],
//   cors: {
//     origin: frontURL,
//   },
// });

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

// clearDB();
// populateDB();

// io.on("connection", handleSocket);

const start = async () => {
  try {
    await connectDB();
    // await syncDB();

    await new Promise<void>((res, rej) => {
      server.once("error", rej);
      server.listen(PORT, "0.0.0.0", res);
    }).then(() => console.log(`=> Server running on ${PORT}...`));
  } catch (err: any) {
    console.log({
      err: err.message,
      stack: err.stack,
    });
    // 0 fail 1 success
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
