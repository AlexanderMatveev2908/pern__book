import { isDev } from "../../config/env.js";

export const __cg = (str: string, ...arg: any[]) => {
  if (!isDev) return;

  console.group(str.toUpperCase());

  for (const a of arg) {
    console.log(a);
  }
  console.groupEnd();
};
