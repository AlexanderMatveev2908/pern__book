import { FC } from "react";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import { BtnAct } from "@/types/types";
import { MdDynamicForm } from "react-icons/md";

const quickFillBtn = {
  label: "Use Profile data",
  icon: MdDynamicForm,
};

const QuickFillBtn: FC = () => {
  const handleClick = () => console.log("run");

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
