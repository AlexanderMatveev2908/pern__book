/* eslint-disable @typescript-eslint/no-explicit-any */
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { isSameData, makeDelay, makeNum } from "@/core/lib/lib";
import { NumericFilterSearch } from "@/types/types";
import { useEffect, useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type Params<T extends FieldValues> = {
  numericFilters?: NumericFilterSearch[];
  realTimeVals: T;
} & SearchCtxValsConsumer &
  UseFormReturn<T>;

export const useHandleErrSearch = ({
  numericFilters,
  setBar,
  setSearch,
  realTimeVals,
  preSubmit: { errNumbers, hasFormErrs, isPopulated },
  setPreSubmit,
  formState: { errors, isDirty, dirtyFields },
  clearErrors,
  setFocus,
}: Params<any>) => {
  const hasWarningRun = useRef<boolean>(false);

  // * DISABLE BTN ON ERRORS
  // ? YOU COULD LEAVE BTN ENABLED AND OPEN BAR ON CLICK AS SECOND CB IN HANDLE_SUBMIT OF REACT_USE_FORM, IT DEPENDS ON YOUR PREFERENCE, THE IMPORTANT THING IS JUST TO SKIP QUERY ON ERROR TO AVOID SENDING INVALID INPUTS LIKE `<script></script>`
  useEffect(() => {
    const handleMainBtn = () => {
      const hasErr =
        !!Object.keys(errors ?? {}).length &&
        Object.values(errors).every((el) => el?.message);

      if (hasErr === hasFormErrs) return;

      setPreSubmit({ el: "hasFormErrs", val: hasErr });
    };

    handleMainBtn();
  }, [realTimeVals, errors, hasFormErrs, setPreSubmit]);

  // * OPEN BAR ON ERROR INSIDE IT
  useEffect(() => {
    if (isDirty && numericFilters?.length) {
      const { currArr, currEl } =
        getErrFooterBar({
          errs: errors,
          numericFilters,
        }) ?? {};

      if (!isPopulated || !currArr || hasWarningRun.current) return;

      hasWarningRun.current = true;

      setBar({ el: "filterBar", val: true });
      setSearch({ el: "currFilter", val: currArr });
      if (currEl)
        makeDelay(() => {
          setFocus(currEl.field);
        }, 400);
    }
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

  // * CLEAR OLD ERRORS NUMBERS, IT COULD BE USEFUL TO SHARE THIS ERROR IN ALL COMPONENTS, LIKE A THING COULD BE SHOW IT ABOVE LABEL OF FILTER IN THE COL OF FOOTER_BAR SPLITTED
  useEffect(() => {
    const handleErrors = () => {
      if (
        errors?.minAvgPrice?.message === msgsFormStore.price.min ||
        errors?.maxAvgPrice?.message === msgsFormStore.price.max
      ) {
        if (
          makeNum("min", realTimeVals?.minAvgPrice) <
          makeNum("max", realTimeVals?.maxAvgPrice)
        ) {
          clearErrors("minAvgPrice");
          clearErrors("maxAvgPrice");
        }
      }
      if (
        errors?.minAvgQty?.message === msgsFormStore.qty.min ||
        errors?.maxAvgQty?.message === msgsFormStore.qty.max
      ) {
        if (
          makeNum("min", realTimeVals?.minAvgQty) <
          makeNum("max", realTimeVals?.maxAvgQty)
        ) {
          clearErrors("minAvgQty");
          clearErrors("maxAvgQty");
        }
      }
      if (
        errors?.managers?.message === msgsFormStore.work.managers ||
        errors?.employees?.message === msgsFormStore.work.employees
      ) {
        if (
          makeNum("min", realTimeVals?.managers) <
          makeNum("max", realTimeVals?.workers)
        )
          clearErrors("managers");
        if (
          makeNum("min", realTimeVals?.employees) <
          makeNum("max", realTimeVals?.e)
        )
          clearErrors("employees");
      }
    };

    handleErrors();
  }, [
    realTimeVals,
    clearErrors,
    errors?.minAvgPrice,
    errors?.maxAvgPrice,
    errors,
  ]);
};
