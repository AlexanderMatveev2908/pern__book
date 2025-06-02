import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { MdClear } from "react-icons/md";

type PropsType = {
  handleClear: () => void;
  isPending: boolean;
  isFetching: boolean;
  styleTxt?: string;
};

const CLearBtn: FC<PropsType> = ({
  isFetching,
  styleTxt,
  handleClear,
  isPending,
}) => {
  return (
    <Button
      {...{
        label: "Clear",
        styleTxt,
        type: "button",
        act: BtnAct.DEL,
        Icon: MdClear,
        handleClick: handleClear,
        isPending,
        isDisabled: isFetching,
      }}
    />
  );
};

export default CLearBtn;
