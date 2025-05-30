/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFieldBasic } from "@/types/types";
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

export const validateSwapper = ({
  objErr,
  fieldsByArea,
  valsForm,
}: {
  objErr: FieldErrors;
  fieldsByArea: FormFieldBasic[][];
  // formData obj type || null
  // i do not know to make dynamic types yet so i use any
  valsForm: any;
}) => {
  let i = 0;
  let j = 0;
  let isValid = true;

  do {
    const currArr = fieldsByArea[i];

    do {
      const currEL = currArr[j];
      if (objErr?.[currEL?.field]?.message) {
        isValid = false;
        break;
      }

      if (
        valsForm !== null &&
        Object.keys(valsForm).some((key) => currEL?.field === key)
      ) {
        const val = valsForm[currEL.field];
        if (
          // just null can result false checked with a simple ! not, OBJECT ARE ALL TRUE EVEN EMPTY
          ((typeof val === "boolean" || typeof val === "object") && !val) ||
          (typeof val === "string" && !val?.trim()?.length)
        ) {
          isValid = false;
          break;
        }
      }

      j++;
    } while (j < currArr.length);

    if (!isValid) break;
    else j = 0;

    i++;
  } while (i < fieldsByArea.length);

  return {
    i: isValid ? 0 : i,
    j,
    isValid,
  };
};
