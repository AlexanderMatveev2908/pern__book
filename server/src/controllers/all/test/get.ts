import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/lib.js";

export const getStuff = async (req: ReqApp, res: Response): Promise<any> => {
  return res200(res);
};
