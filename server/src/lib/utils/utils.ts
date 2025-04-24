import path from "path";
import { fileURLToPath } from "url";
import { isDev } from "../../config/env.js";

export const calcTimeRun = async (cb: () => Promise<any>) => {
  const start = performance.now();

  const res = await cb();

  const end = performance.now();

  if (isDev) console.log(`=> DONE ${end - start} md`);

  return res;
};

export const getDir = () =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), "../../");

export const getDirClient = () => path.join(getDir(), "../../client/dist");

export const getCaDir = () => path.join(getDir(), "certs/ca.pem");
