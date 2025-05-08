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
import { getStorage, makeNum, saveStorage } from "@/core/lib/lib";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { useSyncLoading } from "@/core/hooks/all/useSyncLoading";

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
  const hasRun = useRef<boolean>(false);
  const { setTxtInputs, setSearch, isPending, setIsPending } = useSearchCtx();

  const {
    watch,
    clearErrors,
    formState: { errors },
    trigger,
  } = useFormContext();

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;
    const savedLabels = JSON.parse(getStorage(keyStorageLabels) ?? "[]");
    const updated = savedLabels.length ? savedLabels : [txtInputs[0]];
    setTxtInputs(updated);

    if (!savedLabels?.length) {
      saveStorage({ key: keyStorageLabels, data: updated });
    } else {
      for (const el of savedLabels) {
        trigger(el.field);
      }
    }

    setSearch({ el: "currFilter", val: filters[0] });
  }, [filters, setSearch, setTxtInputs, txtInputs, keyStorageLabels, trigger]);

  const vals = watch();

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
