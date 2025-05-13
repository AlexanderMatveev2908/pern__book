import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  isFetching: boolean;
  handleSearch?: () => void;
  labelSize: boolean;
  isPending: boolean;
  hasFormErrs: boolean;
  labelTxt?: null | string;
};

const SearchBtn: FC<PropsType> = ({
  handleSearch,
  isPending,
  labelSize,
  isFetching,
  hasFormErrs,
  labelTxt,
}) => {
  return (
    <Button
      {...{
        label: labelSize ? labelTxt ?? "Search" : null,
        type: "submit",
        act: BtnAct.DO,
        Icon: FaSearch,
        isPending,
        isDisabled: isFetching || hasFormErrs,
        handleClick:
          typeof handleSearch === "function" ? () => handleSearch() : undefined,
        labelTxt,
      }}
    />
  );
};

export default SearchBtn;
