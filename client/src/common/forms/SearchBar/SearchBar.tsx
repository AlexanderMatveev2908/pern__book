import { FC, useLayoutEffect } from "react";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import ButtonsForm from "./components/ButtonsForm";
import { useFormContext } from "react-hook-form";
import "./SearchBar.css";

type PropsType = {
  isLoading?: boolean;
  handleSave: () => void;
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
  numericFilters?: FilterSearch[];
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  numericFilters,
}) => {
  const { setTxtInputs, setSearch } = useSearchCtx();

  const { setFocus } = useFormContext();

  useLayoutEffect(() => {
    setTxtInputs([txtInputs[0]]);
    setSearch({ el: "currFilter", val: filters[0] });
  }, [filters, setSearch, setTxtInputs, txtInputs]);

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
