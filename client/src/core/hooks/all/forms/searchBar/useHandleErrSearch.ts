import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { isSameData, makeDelay, makeNum } from "@/core/lib/lib";
import { NumericFilterSearch } from "@/types/types";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

type Params = {
  numericFilters?: NumericFilterSearch[];
};

export const useHandleErrSearch = ({ numericFilters }: Params) => {
  const hasWarningRun = useRef<boolean>(false);

  const {
    setBar,
    setSearch,
    args,
    preSubmit: { errNumbers, hasFormErrs, isPopulated },
    setPreSubmit,
  } = useSearchCtx();
  const {
    formState: { errors, isDirty, dirtyFields },
    watch,
    clearErrors,
    setFocus,
  } = useFormContext();
  const vals = watch();

  // * DISABLE BTN ON ERRORS
  // ? YOU COULD LEAVE BTN ENABLED AND OPEN BAR ON CLICK AS SECOND CB IN HANDLE_SUBMIT OF REACT_USE_FORM, IT DEPENDS ON YOUR PREFERENCE, THE IMPORTANT THING IS JUST TO SKIP QUERY ON ERROR TO AVOID SENDING INVALID INPUTS LIKE `<script></script>`
  useEffect(() => {
    const handleMainBtn = () => {
      const hasErr =
        !!Object.keys(errors ?? {}).length &&
        Object.values(errors).every((el) => el?.message);
      const hasPagination = [args["page"], args["limit"]].every(
        (el) => typeof el === "number"
      );
      const isDisabled = hasErr || !hasPagination;

      // const currVals = getValues();
      // const isSame: boolean = isSameData(oldVals.current, currVals);
      // const isDisabled = hasErr || isSame;

      if (isDisabled === hasFormErrs) return null;

      setPreSubmit({ el: "hasFormErrs", val: isDisabled });
    };

    handleMainBtn();
  }, [vals, errors, args, hasFormErrs, setPreSubmit]);

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
    vals,
    dirtyFields,
    numericFilters,
    errors,
    setFocus,
    setBar,
    setSearch,
  ]);

  //  * SHOW FIRST ERROR MESSAGE ABOVE FILTER BTN SO USER KNOW THAT HAS TO DIX ERROR OR WILL NOT BE ABLE TO FILTER
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
  }, [errNumbers, errors, numericFilters, vals, setPreSubmit]);

  // * CLEAR OLD ERRORS NUMBERS
  useEffect(() => {
    const handleErrors = () => {
      if (
        errors?.minAvgPrice?.message === msgsFormStore.price.min ||
        errors?.maxAvgPrice?.message === msgsFormStore.price.max
      ) {
        if (
          makeNum("min", vals?.minAvgPrice) < makeNum("max", vals?.maxAvgPrice)
        ) {
          clearErrors("minAvgPrice");
          clearErrors("maxAvgPrice");
        }
      }
      if (
        errors?.minAvgQty?.message === msgsFormStore.qty.min ||
        errors?.maxAvgQty?.message === msgsFormStore.qty.max
      ) {
        if (makeNum("min", vals?.minAvgQty) < makeNum("max", vals?.maxAvgQty)) {
          clearErrors("minAvgQty");
          clearErrors("maxAvgQty");
        }
      }
    };

    handleErrors();
  }, [vals, clearErrors, errors?.minAvgPrice, errors?.maxAvgPrice, errors]);
};
