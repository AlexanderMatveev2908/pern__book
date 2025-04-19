import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { err500, res200 } from "../../../lib/lib.js";

export const getStuff = async (_: ReqApp, res: Response): Promise<any> => {
  // return err500(res, { msg: "some 500 err" });
  return err500(res, { msg: "some 500 err" });
  // return res200(res, { msg: "you get protected data" });
};
