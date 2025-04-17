import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { res200 } from "../../lib/lib.js";

export const refreshToken = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;

  return res200(res);
};
