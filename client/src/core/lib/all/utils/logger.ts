import { isDev } from "@/core/config/env";

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

  for (const a of arg) {
    console.log(a);
  }

  console.log("=> from:", cleared);
  console.groupEnd();
};

export const logFormData = (formData: FormData) => {
  for (const pair of formData.entries()) {
    __cg(pair[0], pair[1]);
  }
};
