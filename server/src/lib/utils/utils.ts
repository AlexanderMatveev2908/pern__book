import path from "path";
import { fileURLToPath } from "url";
import { isDev } from "../../config/env.js";
import { __cg } from "./log.js";

export const calcTimeRun = async (cb: () => Promise<any>) => {
  const start = performance.now();

  let count = 0;
  const interval = setInterval(() => {
    count += 1;
    if (isDev) __cg(`👻 loading... ${count * 500}ms elapsed`);
  }, 500);

  const res = await cb();

  const end = performance.now();

  clearInterval(interval);
  if (isDev) __cg(`=> DONE ${end - start} md`);

  return res;
};

export const getDir = () =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), "../../");

export const getDirClient = () => path.join(getDir(), "../../client/dist");

export const getCaDir = () => path.join(getDir(), "certs/ca.pem");

export const countTo_5 = (): number[][] =>
  Array.from({ length: 5 }, (_, i) => (!i ? [i, i + 1] : [i + 0.1, i + 1]));
