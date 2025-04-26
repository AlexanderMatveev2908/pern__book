/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import { BtnAct } from "@/types/types";
import { MdDynamicForm } from "react-icons/md";
import { UseFormSetValue } from "react-hook-form";

const quickFillBtn = {
  label: "Use Profile data",
  icon: MdDynamicForm,
};

type PropsType = {
  setValue: UseFormSetValue<any>;
};

const QuickFillBtn: FC<PropsType> = ({ setValue }) => {
  const handleClick = () => setValue("field", "some value");

  return (
    <ButtonIcon
      {...{
        handleClick,
        act: BtnAct.INFO,
        el: quickFillBtn,
        isPending: false,
      }}
    />
  );
};
export default QuickFillBtn;
