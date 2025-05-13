import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  isFetching: boolean;
  handleSearch?: () => void;
  isPending: boolean;
  hasFormErrs: boolean;
  labelTxt?: null | string;
  styleTxt?: string;
};

const SearchBtn: FC<PropsType> = ({
  handleSearch,
  isPending,
  styleTxt,
  isFetching,
  hasFormErrs,
  labelTxt,
}) => {
  return (
    <Button
      {...{
        label: labelTxt ?? "Search",
        styleTxt,
        type: "submit",
        act: BtnAct.DO,
        Icon: FaSearch,
        isPending,
        isDisabled: isFetching || hasFormErrs,
        handleClick:
          typeof handleSearch === "function" ? () => handleSearch() : undefined,
      }}
    />
  );
};

export default SearchBtn;
