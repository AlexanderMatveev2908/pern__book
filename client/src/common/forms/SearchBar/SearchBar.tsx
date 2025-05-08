import { FC, useEffect, useRef } from "react";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  StorageKeys,
} from "@/types/types";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import ButtonsForm from "./components/ButtonsForm";
import { useFormContext } from "react-hook-form";
import "./SearchBar.css";
import {
  __cg,
  clearTimer,
  getStorage,
  isObjOk,
  isSameData,
  makeDelay,
  makeNum,
  saveStorage,
} from "@/core/lib/lib";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { useSyncLoading } from "@/core/hooks/all/useSyncLoading";
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import SkeletonBar from "./components/SkeletonBar";
import { ArgsSearchType } from "@/core/contexts/SearchCtx/reducer/initState";

type PropsType = {
  isLoading?: boolean;
  isFetching: boolean;
  handleSave: () => void;
  txtInputs: FormFieldBasic[];
  keyStorageVals: StorageKeys;
  keyStorageLabels: StorageKeys;
  filters: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  numericFilters,
  keyStorageVals,
  keyStorageLabels,
  isFetching,
  isLoading,
}) => {
  // const savedVals = getStorage(keyStorageVals);
  const hasWarningRun = useRef<boolean>(false);
  const oldVals = useRef<ArgsSearchType | null>(
    // savedVals
    //   ? JSON.parse(savedVals)
    //   : {
    //       [txtInputs[0].field]: "",
    //     }
    {}
  );
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const {
    setTxtInputs,
    setSearch,
    isPending,
    setIsPending,
    setBtnDisabled,
    setArgs,
    setBar,
    isBtnDisabled,
    isPopulated,
    setPopulated,
    canSpin,
    setCanSpin,
  } = useSearchCtx();

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

    if (!savedLabels?.length)
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
    isPopulated,
  ]);

  // * DEBOUNCE SUBMIT OF VALS TO SERVER OF 500 ms

  useEffect(() => {
    timerID.current = setTimeout(() => {
      const currVals = getValues();
      const isSame: boolean = isSameData(oldVals.current, currVals);

      __cg("old", oldVals.current);
      __cg("new", currVals);
      __cg("same", isSame);

      if (isSame) {
        if (
          !isPopulated &&
          [currVals, oldVals.current].every((el) => isObjOk(el))
        )
          setPopulated(true);

        return null;
      }

      oldVals.current = currVals;
      saveStorage({ key: keyStorageVals, data: currVals });

      if (canSpin) setArgs({ ...currVals });
      else setCanSpin(true);

      clearTimer(timerID);
    }, 500);

    return () => {
      clearTimer(timerID);
    };
  }, [
    getValues,
    keyStorageVals,
    setArgs,
    vals,
    txtInputs,
    setPopulated,
    isPopulated,
    canSpin,
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

  // * CLEAR OLD ERRORS
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
  // * OPEN BAR ON ERROR INSIDE IT
  useEffect(() => {
    if (isDirty && numericFilters?.length) {
      const { currArr, currEl } =
        getErrFooterBar({
          errs: errors,
          numericFilters,
        }) ?? {};

      if (!currArr || hasWarningRun.current) return;

      hasWarningRun.current = true;
      setBar({ el: "filterBar", val: true });
      setSearch({ el: "currFilter", val: currArr });
      if (currEl)
        makeDelay(() => {
          setFocus(currEl.field);
        }, 150);
    }
  }, [
    isDirty,
    vals,
    dirtyFields,
    numericFilters,
    errors,
    setFocus,
    setBar,
    setSearch,
  ]);

  // * DISABLE BTN ON ERRORS
  // ? YOU COULD LEAVE BTN ENABLED AND OPEN BAR ON CLICK AS SECOND CB IN HANDLE_SUBMIT OF REACT_USE_FORM, IT DEPENDS ON YOUR PREFERENCE, THE IMPORTANT THING IS JUST TO SKIP QUERY ON ERROR TO AVOID SENDING INVALID INPUTS LIKE `<script></script>`
  useEffect(() => {
    const handleMainBtn = () => {
      const hasErr =
        !!Object.keys(errors ?? {}).length &&
        Object.values(errors).every((el) => el?.message);

      if (hasErr === isBtnDisabled) return null;

      setBtnDisabled(hasErr);
    };

    handleMainBtn();
  }, [vals, setBtnDisabled, errors, isBtnDisabled]);

  return isLoading ? (
    <SkeletonBar />
  ) : (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4"
    >
      <BgBlack />
      <FilterBar {...{ filters, numericFilters }} />

      <TxtInputs {...{ txtInputs, keyStorageLabels }}>
        <ButtonsForm
          {...{
            txtInputs,
            keyStorageVals,
            keyStorageLabels,
            isFetching,
            numericFilters,
          }}
        />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
