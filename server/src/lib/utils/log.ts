import path from "path";
import fs from "fs";
import { isDev } from "../../config/env.js";
import { ReqApp } from "../../types/types.js";
import { fileURLToPath } from "url";
import { NextFunction } from "express";
import { err500 } from "../responseClient/err.js";

export const __cg = (str: string, ...arg: any[]) => {
  if (!isDev) return;

  console.group(str.toUpperCase());

  for (const a of arg) {
    console.log(a);
  }
  console.groupEnd();
};

export const logJSON = async (
  req: ReqApp,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const dir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../"
  );

  if (!fs.existsSync(path.join(dir, "json")))
    await new Promise((res) => fs.mkdir(path.join(dir, "json"), res));

  await new Promise((res) =>
    fs.writeFile(
      path.join(dir, "json", "req.json"),
      JSON.stringify(
        {
          body: req.body,
          files: req.files ?? {},
          file: req.file ?? {},
          query: Object.fromEntries(
            Object.entries(req.query ?? {}).map(([key, val]) => [key, val])
          ),
          params: req.params ?? {},
          auth: req.headers?.authorization ?? {},
          refresh: req.cookies?.refreshToken ?? {},
        },
        null,
        2
      ),
      res
    )
  );

  return next();
};

/*
  if (!fs.existsSync(path.join(dir, "video")))
    await new Promise((res) => fs.mkdir(path.join(dir, "video"), res));
  */
