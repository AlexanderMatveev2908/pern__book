/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors } from "react-hook-form";

export const isFormValid = (objErrs: FieldErrors, objVals: any) =>
  !Object.keys(objErrs ?? {}).length &&
  Object.values(objVals ?? {}).every((val) =>
    typeof val === "string"
      ? !!val?.trim()?.length
      : typeof val === "boolean"
      ? val
      : Array.isArray(val)
      ? val?.length
      : val
  );

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
