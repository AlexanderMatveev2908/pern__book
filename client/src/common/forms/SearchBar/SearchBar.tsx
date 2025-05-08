import { FC, useEffect } from "react";
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
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import "./SearchBar.css";
import { getStorage, makeNum, saveStorage } from "@/core/lib/lib";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { useSyncLoading } from "@/core/hooks/all/useSyncLoading";
import { useDebounce } from "@/core/hooks/all/useDebounce";
import { showErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";

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
}) => {
  const {
    setTxtInputs,
    setSearch,
    isPending,
    setIsPending,
    setBtnDisabled,
    setArgs,
    setBar,
  } = useSearchCtx();

  const {
    clearErrors,
    formState: { errors },
    trigger,
    setValue,
    control,
    getValues,
  } = useFormContext();

  const { isDirty, dirtyFields } = useFormState({ control });

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
  ]);

  const vals = useWatch({
    control,
  });

  useDebounce({
    getValues,
    realTimeVals: vals,
    keyStorage: StorageKeys.STORES_OWNER,
    setArgs,
  });

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

  useEffect(() => {
    setBtnDisabled(errors);
  }, [vals, setBtnDisabled, errors]);

  useEffect(() => {
    if (isDirty && numericFilters?.length) {
      showErrFooterBar({ errs: errors, numericFilters, setBar, setSearch });
    }
  }, [isDirty, dirtyFields, numericFilters, errors, setBar, setSearch]);

  console.log("render");
  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 "
    >
      <BgBlack />
      <FilterBar {...{ filters, numericFilters }} />

      <TxtInputs {...{ txtInputs, keyStorageLabels }}>
        <ButtonsForm
          {...{ txtInputs, keyStorageVals, keyStorageLabels, isFetching }}
        />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
