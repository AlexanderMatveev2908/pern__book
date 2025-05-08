import {
  ParamsBar,
  ParamsSearch,
} from "@/core/contexts/SearchCtx/reducer/actions";
import { NumericFilterSearch } from "@/types/types";
import { FieldErrors } from "react-hook-form";

export const showErrFooterBar = ({
  errs,
  numericFilters,
  setSearch,
  setBar,
}: {
  errs: FieldErrors;
  numericFilters: NumericFilterSearch[];
  setSearch: (vals: ParamsSearch) => void;
  setBar: (vals: ParamsBar) => void;
}) => {
  const keysErr = Object.keys(errs);
  let i = 0;

  do {
    const currArr = numericFilters[i];
    let j = 0;
    do {
      const currEl = currArr.fields[j];
      if (keysErr.includes(currEl.field)) {
        setSearch({ el: "currFilter", val: currArr });
        setBar({ el: "filterBar", val: true });
        i = Infinity;
        break;
      }

      j++;
    } while (j < currArr.fields.length);

    i++;
  } while (i < numericFilters.length);
};
