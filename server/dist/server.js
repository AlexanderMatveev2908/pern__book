var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import express from "express";
import { connectDB, syncDB } from "./config/db.js";
import { errMiddleware } from "./middleware/middleware.js";
import { isDev } from "./config/env.js";
import { getDirClient } from "./lib/lib.js";
const app = express();
const PORT = +process.env.PORT;
// trust first proxy hop
app.set("trust proxy", 1);
app.use(express.json());
// app.use("/api/v1", mainRouter);
if (!isDev) {
    app.use(express.static(getDirClient()));
    app.get("*", (_, res) => res.sendFile(getDirClient()));
}
app.use(errMiddleware);
// getDataDB();
// clearDB();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        yield syncDB();
        yield new Promise((res, rej) => {
            app.listen(PORT, (err) => {
                if (err)
                    rej(err);
                res();
            });
        }).then(() => console.log(`=> Server running on ${PORT}...`));
    }
    catch (err) {
        console.log({
            err: err.message,
            stack: err.stack,
        });
        // 0 fail 1 success
        process.exit(1);
    }
});
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
