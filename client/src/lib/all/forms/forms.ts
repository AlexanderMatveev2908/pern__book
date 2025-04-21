/* eslint-disable @typescript-eslint/no-explicit-any */
import { SwapFieldType } from "@/config/fields/all/general/userFields";
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
  fieldsByArea: SwapFieldType[][];
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
      if (Object.keys(valsForm).some((key) => currEL?.field === key)) {
        if (!valsForm[currEL.field]?.trim()?.length) {
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
