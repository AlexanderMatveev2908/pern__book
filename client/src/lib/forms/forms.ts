import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const getErrLen = (obj: FieldErrors) => !!Object.keys(obj ?? {}).length;

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
