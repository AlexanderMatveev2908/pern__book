/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import { BtnAct, FormSettersProps } from "@/types/types";
import { MdDynamicForm } from "react-icons/md";

const quickFillBtn = {
  label: "Use Profile data",
  icon: MdDynamicForm,
};

const QuickFillBtn: FC<Omit<FormSettersProps, "watch">> = ({ setValue }) => {
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
