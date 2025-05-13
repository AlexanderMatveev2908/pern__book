/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  res: any;
  handleSearch?: () => void;
  labelSubmit: boolean;
  isPending: boolean;
  hasFormErrs: boolean;
};

const SearchBtn: FC<PropsType> = ({
  handleSearch,
  isPending,
  labelSubmit,
  res,
  hasFormErrs,
}) => {
  return (
    <Button
      {...{
        label: labelSubmit ? "Search" : null,
        type: "submit",
        act: BtnAct.DO,
        Icon: FaSearch,
        isPending,
        isDisabled: res?.isFetching || hasFormErrs,
        handleClick:
          typeof handleSearch === "function" ? () => handleSearch() : undefined,
      }}
    />
  );
};

export default SearchBtn;
