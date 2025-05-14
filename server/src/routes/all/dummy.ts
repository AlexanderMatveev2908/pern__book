import express, { Response } from "express";
import { ReqApp } from "../../types/types.js";

const dummyRouter = express.Router();

dummyRouter.get("/", (req: ReqApp, res: Response): any => {
  return res.status(200).json({ msg: "content..." });
});

export default dummyRouter;
