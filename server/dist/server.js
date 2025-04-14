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
import { makeRelations } from "./theorySql/models/relations.js";
const app = express();
const PORT = +process.env.PORT;
app.set("trust proxy", 1);
// app.use("/api/v1", mainRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        makeRelations();
        yield syncDB();
        app.listen(PORT, "0.0.0.0", () => console.log(`=> server running on ${PORT}...`));
    }
    catch (err) {
        console.log({
            err: err.message,
            stack: err.stack,
        });
    }
});
start();
