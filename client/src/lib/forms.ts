import { FieldErrors } from "react-hook-form";

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
