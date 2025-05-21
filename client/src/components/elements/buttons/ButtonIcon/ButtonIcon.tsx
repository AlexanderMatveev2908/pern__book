/* eslint-disable @typescript-eslint/no-explicit-any */
import { BtnAct, BtnFieldIconType } from "@/types/types";
import { FC } from "react";
import MiniSpinner from "../../spinners/MiniSpinner/MiniSpinner";

type PropsType = {
  el: BtnFieldIconType;
  act?: BtnAct;
  handleClick: (arg: any) => void;
  isPending?: boolean;
  isDisabled?: boolean;
  styleTxt?: string;
};

const getCol = (act: BtnAct) => {
  let border = "border-blue-600";
  let hoverTxt = "enabled:hover:text-blue-600";

  switch (act) {
    case BtnAct.DO:
      border = "border-green-600";
      hoverTxt = "enabled:hover:text-green-600";
      break;
    case BtnAct.DEL:
      border = "border-red-600";
      hoverTxt = "enabled:hover:text-red-600";
      break;
    default:
      break;
  }

  return border + " " + hoverTxt;
};

const ButtonIcon: FC<PropsType> = ({
  el,
  act,
  handleClick,
  isPending,
  isDisabled,
  styleTxt,
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled || isPending}
      type="button"
      className={`w-full border-2 rounded-xl py-2 px-4 enabled:cursor-pointer  flex items-center gap-5 justify-center group z-20 bg-neutral-950 disabled:opacity-50  btn__logic_md
        transition-colors duration-300 ${getCol(act ?? BtnAct.INFO)} `}
    >
      {isPending ? <MiniSpinner /> : <el.icon className="icon__sm" />}
      {el?.label && (
        <span className={`txt__3 ${styleTxt ?? ""}`}>
          {isPending ? el.pendingLabel ?? el.label : el.label}
        </span>
      )}
    </button>
  );
};
export default ButtonIcon;
