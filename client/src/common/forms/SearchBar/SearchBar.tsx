import { FC, useLayoutEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BtnAct, FormFieldBasic } from "@/types/types";
import Button from "@/components/elements/buttons/Button/Button";
import { MdClear } from "react-icons/md";
import "./SearchBar.css";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import SortBar from "./components/SortBar/SortBar";

type PropsType = {
  isLoading?: boolean;
  handleSave: () => void;
  txtInputs: FormFieldBasic[];
};

export const getSize = (label: boolean) =>
  label ? "max-w-[200px]" : "max-w-[75px]";

const SearchBar: FC<PropsType> = ({ handleSave, txtInputs }) => {
  const {
    labels: { labelSubmit },
    setTxtInputs,
  } = useSearchCtx();

  useLayoutEffect(() => {
    setTxtInputs([txtInputs[0]]);
  }, []);

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 "
    >
      <TxtInputs {...{ txtInputs }} />

      <BgBlack />
      <FilterBar />
      <SortBar />

      <div className="w-full grid grid-cols-2 search_bar__submit gap-x-10 items-center justify-items-center">
        <div
          className={`w-full items-center justify-self-center mt-5 ${getSize(
            labelSubmit
          )}`}
        >
          <Button
            {...{
              label: labelSubmit ? "Search" : null,
              isDisabled: false,
              type: "submit",
              act: BtnAct.DO,
              Icon: FaSearch,
              // isPending: true,
            }}
          />
        </div>
        <div
          className={`w-full items-center justify-self-center mt-5 ${getSize(
            labelSubmit
          )}`}
        >
          <Button
            {...{
              label: labelSubmit ? "Clear" : null,
              isDisabled: false,
              type: "button",
              act: BtnAct.DEL,
              Icon: MdClear,
              // isPending: true,
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
