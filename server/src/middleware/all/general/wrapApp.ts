import { NextFunction, Request, Response } from "express";
import { ReqApp } from "../../../types/types.js";

export const wrapApp =
  (cbAPI: any) =>
  async (req: ReqApp, res: Response, next: NextFunction): Promise<any> => {
    try {
      return await cbAPI(req, res, next);
    } catch (error) {
      next(error);
    }
  };
