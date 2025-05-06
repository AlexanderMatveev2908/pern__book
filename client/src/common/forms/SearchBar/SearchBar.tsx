import { FC, useLayoutEffect } from "react";
import { FormFieldBasic } from "@/types/types";
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
};

export const getSize = (label: boolean) =>
  label ? "max-w-[200px]" : "max-w-[75px]";

const SearchBar: FC<PropsType> = ({ handleSave, txtInputs }) => {
  const { setTxtInputs } = useSearchCtx();

  const { setFocus } = useFormContext();

  useLayoutEffect(() => {
    setTxtInputs([txtInputs[0]]);
  }, []);

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 "
    >
      <BgBlack />
      <FilterBar />

      <TxtInputs {...{ txtInputs }}>
        <ButtonsForm {...{ txtInputs, setFocus }} />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
