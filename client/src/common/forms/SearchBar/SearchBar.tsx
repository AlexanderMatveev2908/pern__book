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
import { useFormContext } from "react-hook-form";
import "./SearchBar.css";
import { getStorage, makeNum } from "@/core/lib/lib";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";

type PropsType = {
  isLoading?: boolean;
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
}) => {
  const { setTxtInputs, setSearch } = useSearchCtx();

  const {
    setFocus,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const savedLabels = JSON.parse(getStorage(keyStorageLabels) ?? "[]");
    setTxtInputs(savedLabels.length ? savedLabels : [txtInputs[0]]);
    setSearch({ el: "currFilter", val: filters[0] });
  }, [filters, setSearch, setTxtInputs, txtInputs, keyStorageLabels]);

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

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 "
    >
      <BgBlack />
      <FilterBar {...{ filters, numericFilters }} />

      <TxtInputs {...{ txtInputs, keyStorageLabels }}>
        <ButtonsForm
          {...{ txtInputs, setFocus, keyStorageVals, keyStorageLabels }}
        />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
