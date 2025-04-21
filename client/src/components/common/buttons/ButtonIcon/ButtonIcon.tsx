import { FieldHeaderFooter } from "@/config/fields/fields";
import { BtnAct } from "@/types/types";
import { FC } from "react";

type PropsType = {
  el: FieldHeaderFooter;
  act: BtnAct;
  handleCLick: () => void;
};

const getCol = (act: BtnAct) => {
  let border = "border-blue-600";
  let hoverTxt = "hover:text-blue-600";

  switch (act) {
    case BtnAct.DO:
      border = "border-green-600";
      hoverTxt = "hover:text-green-600";
      break;
    case BtnAct.DEL:
      border = "border-red-600";
      hoverTxt = "hover:text-red-600";
      break;
    default:
      break;
  }

  return border + " " + hoverTxt;
};

const ButtonIcon: FC<PropsType> = ({ el, act, handleCLick }) => {
  return (
    <button
      onClick={handleCLick}
      type="button"
      className={`w-full border-2  rounded-xl py-2 px-4 cursor-pointer btn__logic_md flex items-center gap-2 justify-center group ${getCol(
        act
      )}`}
    >
      <el.icon className="icon__sm" />

      <span className="txt__3">{el.label}</span>
    </button>
  );
};
export default ButtonIcon;
