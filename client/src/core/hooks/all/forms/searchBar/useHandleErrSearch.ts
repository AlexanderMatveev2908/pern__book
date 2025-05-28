/* eslint-disable @typescript-eslint/no-explicit-any */
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import { isSameData, makeDelay } from "@/core/lib/lib";
import { NumericFilterSearch } from "@/types/types";
import { useEffect, useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type Params<T extends FieldValues> = {
  numericFilters?: NumericFilterSearch[];
  realTimeVals: T;
  ctx: SearchCtxValsConsumer;
  formCtx: UseFormReturn<T>;
};

export const useHandleErrSearch = ({
  numericFilters,
  realTimeVals,
  ctx,
  formCtx,
}: Params<any>) => {
  const hasWarningRun = useRef<boolean>(false);

  const {
    preSubmit: { errNumbers, hasFormErrs, isPopulated },
    setPreSubmit,
    setBar,
    setSearch,
  } = ctx;
  const {
    formState: { errors, isDirty, dirtyFields },
    setFocus,
  } = formCtx;

  // * DISABLE BTN ON ERRORS
  // ? YOU COULD LEAVE BTN ENABLED AND OPEN BAR ON CLICK AS SECOND CB IN HANDLE_SUBMIT OF REACT_USE_FORM, IT DEPENDS ON YOUR PREFERENCE, THE IMPORTANT THING IS JUST TO SKIP QUERY ON ERROR TO AVOID SENDING INVALID INPUTS LIKE `<script></script>`
  useEffect(() => {
    const handleMainBtn = () => {
      const hasErr =
        !!Object.keys(errors ?? {}).length &&
        (Object.values(errors).every((el) => el?.message) ||
          Object.values(errors?.items ?? []).every((el) => el?.val?.message));

      if (hasErr === hasFormErrs) return;

      setPreSubmit({ el: "hasFormErrs", val: hasErr });
    };

    handleMainBtn();
  }, [realTimeVals, errors, hasFormErrs, setPreSubmit]);

  // * OPEN BAR ON ERROR INSIDE IT
  useEffect(() => {
    if (hasWarningRun.current || !isPopulated) return;

    const timerID = setTimeout(() => {
      if (isDirty && numericFilters?.length) {
        const res = getErrFooterBar({
          errs: errors,
          numericFilters,
        });

        if (typeof res === "object") hasWarningRun.current = true;

        const { currArr, currEl } = res ?? {};

        if (!currArr) return;

        setBar({ el: "filterBar", val: true });
        setSearch({ el: "currFilter", val: currArr });
        if (currEl)
          makeDelay(() => {
            setFocus(currEl.field);
          }, 200);
      }
    }, 200);

    return () => clearTimeout(timerID);
  }, [
    isPopulated,
    isDirty,
    realTimeVals,
    dirtyFields,
    numericFilters,
    errors,
    setFocus,
    setBar,
    setSearch,
  ]);

  //  * SHOW FIRST ERROR MESSAGE ABOVE FILTER BTN SO USER KNOW THAT HAS TO FIX ERROR OR WILL NOT BE ABLE TO FILTER AT ALL
  useEffect(() => {
    const handleNumberErr = () => {
      const errFilter = getErrFooterBar({
        errs: errors,
        numericFilters,
      });

      if (!isSameData(errFilter, errNumbers))
        setPreSubmit({ el: "errNumbers", val: errFilter });
    };

    handleNumberErr();
  }, [errNumbers, errors, numericFilters, realTimeVals, setPreSubmit]);
};
