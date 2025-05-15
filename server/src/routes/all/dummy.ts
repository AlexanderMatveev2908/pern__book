import express, { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { v4 } from "uuid";
import { err500 } from "../../lib/responseClient/err.js";

const dummyRouter = express.Router();

dummyRouter.get("/", (req: ReqApp, res: Response): any => {
  return err500(res);

  return res.status(200).json({
    msg: "content...",
    items: Array.from({ length: 10 }, (_, i) => ({ val: i + 1, id: v4() })),
  });
});

export default dummyRouter;
