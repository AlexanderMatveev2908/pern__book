import { NextFunction, Request, Response } from "express";

export const wrapApp =
  (cbAPI: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      return await cbAPI(req, res, next);
    } catch (error) {
      next(error);
    }
  };
