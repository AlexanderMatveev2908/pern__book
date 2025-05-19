import { isStr } from "../../utils/dataStructures";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeParams = <T extends Record<string, any>>(formDataHook: T) => {
  const params = new URLSearchParams();

  for (const key in formDataHook) {
    const val = formDataHook[key];

    if (typeof val === "string" && val.trim().length) {
      params.append(key, val);
    } else if (typeof val === "number") {
      params.append(key, val + "");
    } else if (Array.isArray(val) && val.length) {
      for (const el of val as Iterable<any>) {
        if (typeof val === "string") params.append(key, el);
        else if (
          typeof val === "object" &&
          isStr(el?.field) &&
          isStr(el?.val)
        ) {
          params.append(el.field, el.val);
        }
      }
    }
  }

  return params;
};
