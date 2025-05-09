import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { ParamsErrNumber } from "@/core/contexts/SearchCtx/reducer/actions";
import { ArgsSearchType } from "@/core/contexts/SearchCtx/reducer/initState";
import { useGetSearchKeysStorage } from "@/core/hooks/all/useGetSearchKeysStorage";
import { useSyncLoading } from "@/core/hooks/all/useSyncLoading";
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import {
  __cg,
  clearTimer,
  getStorage,
  isSameData,
  makeDelay,
  makeNum,
  saveStorage,
} from "@/core/lib/lib";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

type Params = {
  isFetching: boolean;
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
};

export const useSearchBar = ({
  txtInputs,
  filters,
  numericFilters,
  isFetching,
}: Params) => {
  // const savedVals = getStorage(keyStorageVals);
  const hasWarningRun = useRef<boolean>(false);
  const oldVals = useRef<ArgsSearchType | null>(null);
  const timerID = useRef<NodeJS.Timeout | null>(null);
  const { keyStorageLabels, keyStorageVals } = useGetSearchKeysStorage();

  const state = useSearchCtx();
  const {
    setTxtInputs,
    setSearch,
    isPending,
    setIsPending,
    setBtnDisabled,
    setArgs,
    setBar,
    isBtnDisabled,
    canMakeAPI,
    setCanMakeAPI,
    setPopulated,
    isPopulated,
    pagination: { page, limit, block },
    setPagination,
    args,
    errNumbers,
    setErrNumbers,
  } = state;

  const {
    clearErrors,
    trigger,
    setValue,
    formState: { isDirty, dirtyFields, errors },
    getValues,
    watch,
    setFocus,
  } = useFormContext();
  const vals = watch();

  // * POPULATE FORM EXISTING VALS
  useEffect(() => {
    const savedVals = getStorage(keyStorageVals);

    const savedLabels = JSON.parse(getStorage(keyStorageLabels) ?? "[]");
    const updatedLabels = savedLabels.length ? savedLabels : [txtInputs[0]];
    setTxtInputs(updatedLabels);
    if (!savedLabels.length)
      saveStorage({ key: keyStorageLabels, data: updatedLabels });

    setSearch({ el: "currFilter", val: filters[0] });

    if (savedVals) {
      const parsed = JSON.parse(savedVals);
      for (const key in parsed) {
        const val = parsed[key];
        if (
          (typeof val === "string" && val.trim().length) ||
          (Array.isArray(val) && val.length)
        )
          setValue(key, val, {
            shouldValidate: true,
            shouldDirty: true,
          });
      }

      setPagination({
        el: "page",
        val: parsed?.page ?? 0,
      });
      setPagination({
        el: "block",
        val: parsed?.block ?? 0,
      });
    }
  }, [
    setValue,
    keyStorageVals,
    filters,
    keyStorageLabels,
    setSearch,
    setTxtInputs,
    trigger,
    txtInputs,
    setPagination,
  ]);

  // * DEBOUNCE SUBMIT OF VALS TO SERVER OF 500 ms

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const currVals = getValues();
      const isSame: boolean = isSameData(oldVals.current, currVals);

      if (isSame) {
        if (!isPopulated) {
          oldVals.current = {
            ...currVals,
            [txtInputs[0].field]: currVals[txtInputs[0].field] || "",
          };
          setPopulated(true);
        }

        clearTimer(timerID);
        return null;
      }

      oldVals.current = currVals as ArgsSearchType;
      saveStorage({
        key: keyStorageVals,
        data: { ...currVals, page, block },
      });

      if (canMakeAPI)
        setArgs({
          ...(currVals as ArgsSearchType),
          page,
          limit,
          _: Date.now(),
        });
      else setCanMakeAPI(true);

      clearTimer(timerID);
    }, 500);

    return () => {
      clearTimer(timerID);
    };
  }, [
    txtInputs,
    block,
    limit,
    getValues,
    keyStorageVals,
    setArgs,
    vals,
    canMakeAPI,
    setCanMakeAPI,
    setPopulated,
    isPopulated,
    page,
  ]);

  // * SYNC LOADING SUBMIT AND CLEAR BTN
  useSyncLoading({
    isFetching,
    isPendingCustom: isPending.submit,
    setIsPending: (val: boolean) => setIsPending({ el: "submit", val }),
  });
  useSyncLoading({
    isFetching,
    isPendingCustom: isPending.clear,
    setIsPending: (val: boolean) => setIsPending({ el: "clear", val }),
  });

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
    isBtnDisabled,
  ]);

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

      if (isDisabled === isBtnDisabled) return null;

      setBtnDisabled(isDisabled);
    };

    handleMainBtn();
  }, [
    vals,
    setBtnDisabled,
    errors,
    isBtnDisabled,
    getValues,
    args,
    errNumbers,
    numericFilters,
    setErrNumbers,
  ]);

  useEffect(() => {
    const handleNumberErr = () => {
      const errFilter = getErrFooterBar({
        errs: errors,
        numericFilters,
      });
      if (!isSameData(errFilter, errNumbers))
        setErrNumbers(errFilter as ParamsErrNumber);
    };

    handleNumberErr();
  }, [errNumbers, setErrNumbers, errors, numericFilters, vals]);

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

  useEffect(() => {
    __cg("state", state);
  }, [state]);
};
