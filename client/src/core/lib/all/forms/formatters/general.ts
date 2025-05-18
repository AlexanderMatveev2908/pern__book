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
      for (const el of val as string[]) {
        params.append(key, el);
      }
    }
  }

  return params;
};
