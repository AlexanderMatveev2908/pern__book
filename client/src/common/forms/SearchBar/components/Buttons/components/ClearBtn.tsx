import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { MdClear } from "react-icons/md";

type PropsType = {
  handleClear: () => void;
  labelSize: boolean;
  isPending: boolean;
  isFetching: boolean;
};

const CLearBtn: FC<PropsType> = ({
  isFetching,
  handleClear,
  isPending,
  labelSize,
}) => {
  return (
    <Button
      {...{
        label: labelSize ? "Clear" : null,
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
