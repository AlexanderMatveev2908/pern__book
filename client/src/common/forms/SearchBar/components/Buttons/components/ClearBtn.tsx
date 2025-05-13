/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { MdClear } from "react-icons/md";

type PropsType = {
  res: any;
  handleClear: () => void;
  labelSubmit: boolean;
  isPending: boolean;
};

const CLearBtn: FC<PropsType> = ({
  res,
  handleClear,
  isPending,
  labelSubmit,
}) => {
  return (
    <Button
      {...{
        label: labelSubmit ? "Clear" : null,
        type: "button",
        act: BtnAct.DEL,
        Icon: MdClear,
        handleClick: handleClear,
        isPending,
        isDisabled: res?.isFetching,
      }}
    />
  );
};

export default CLearBtn;
