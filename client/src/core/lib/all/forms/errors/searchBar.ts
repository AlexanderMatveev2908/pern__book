import { NumericFilterSearch } from "@/types/types";
import { FieldErrors } from "react-hook-form";

export const getErrFooterBar = ({
  errs,
  numericFilters,
}: {
  errs: FieldErrors;
  numericFilters?: NumericFilterSearch[];
}) => {
  const keysErr = Object.keys(errs);
  let i = 0;

  if (!numericFilters?.length || !keysErr.length) return null;

  do {
    const currArr = numericFilters[i];
    let j = 0;
    do {
      const currEl = currArr.fields[j];

      if (keysErr.includes(currEl.field) && errs[currEl.field]?.message)
        return {
          currArr,
          currEl,
        };

      j++;
    } while (j < currArr.fields.length);

    i++;
  } while (i < numericFilters.length);

  return null;
};
