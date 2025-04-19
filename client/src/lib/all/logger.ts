import { isDev } from "@/config/env";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const __cg = (str: string, ...arg: any[]) => {
  if (!isDev) return;

  const err = new Error();
  const stackLines = err.stack?.split("\n") ?? [];
  const caller = stackLines[2]?.trim() || "unknown caller";
  const callerPath = caller.split(" ").pop() || "unknown path";
  const path = callerPath.split("/").pop() || "unknown path";
  const cleared = path.split(".").shift();

  console.group(str.toUpperCase());

  console.log(cleared);

  for (const a of arg) {
    console.log(a);
  }
  console.groupEnd();
};
