import { FC, useEffect, useLayoutEffect } from "react";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import ButtonsForm from "./components/ButtonsForm";
import { useFormContext } from "react-hook-form";
import "./SearchBar.css";
import { __cg } from "@/core/lib/lib";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";

type PropsType = {
  isLoading?: boolean;
  handleSave: () => void;
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  numericFilters,
}) => {
  const { setTxtInputs, setSearch } = useSearchCtx();

  const {
    setFocus,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  useLayoutEffect(() => {
    setTxtInputs([txtInputs[0]]);
    setSearch({ el: "currFilter", val: filters[0] });
  }, [filters, setSearch, setTxtInputs, txtInputs]);

  const vals = watch();

  useEffect(() => {
    const handleErrors = () => {
      if (
        errors?.minAvgPrice?.message === msgsFormStore.price.min ||
        errors?.maxAvgPrice?.message === msgsFormStore.price.max
      )
        if (+(vals?.minAvgPrice ?? "0") < +(vals?.maxAvgPrice ?? "0")) {
          clearErrors("minAvgPrice");
          clearErrors("maxAvgPrice");
        }
    };

    handleErrors();

    __cg("vals", vals);
    __cg("err", errors);
  }, [vals, clearErrors, errors?.minAvgPrice, errors?.maxAvgPrice, errors]);

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 "
    >
      <BgBlack />
      <FilterBar {...{ filters, numericFilters }} />

      <TxtInputs {...{ txtInputs }}>
        <ButtonsForm {...{ txtInputs, setFocus }} />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
