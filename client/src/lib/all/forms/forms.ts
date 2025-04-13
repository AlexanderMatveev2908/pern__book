/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors } from "react-hook-form";
import { z } from "zod";
import { REG_PWD } from "../../../config/regex";

export const getErrLen = (obj: FieldErrors, objVals: any) =>
  !!Object.keys(obj ?? {}).length ||
  Object.values(objVals ?? {}).some((val) => !val);

export const getErrCurrSwap = (obj: FieldErrors, fields: string[]) => {
  let isValid = true;

  let i = fields.length - 1;
  do {
    const curr = fields[i];
    if (obj[curr]?.message) {
      isValid = false;
      break;
    }

    i--;
  } while (i >= 0);

  return isValid;
};

export const schemaEmail = () => ({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email too long")
    .email("Invalid Email Format"),
});
export const schemaPwd = () => ({
  password: z
    .string()
    .min(1, "Password is required")
    .max(30, "Password too long")
    .regex(REG_PWD, "Invalid password format")
    .nullable(),
});
export const schemaLogin = {
  ...schemaEmail(),
  ...schemaPwd(),
};
