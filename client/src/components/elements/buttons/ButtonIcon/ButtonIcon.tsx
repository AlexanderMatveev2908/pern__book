/* eslint-disable @typescript-eslint/no-explicit-any */
import { BtnAct, BtnFieldIconType } from "@/types/types";
import { FC } from "react";
import MiniSpinner from "../../spinners/MiniSpinner/MiniSpinner";

type PropsType = {
  el: BtnFieldIconType;
  act?: BtnAct;
  handleClick?: (arg: any) => void;
  isPending?: boolean;
  isDisabled?: boolean;
  styleTxt?: string;
  type?: "button" | "submit";
  styleIcon?: string;
  handleMousePress?: () => void;
  handleMouseUp?: () => void;
  handleMouseLeave?: () => void;
};

const getCol = (act: BtnAct) => {
  let border = "border-blue-600";
  let hoverTxt = "enabled:hover:text-blue-600";

  switch (act) {
    case BtnAct.DO:
      border = "border-green-600";
      hoverTxt = "enabled:hover:text-green-600";
      break;
    case BtnAct.WARN:
      border = "border-yellow-500";
      hoverTxt = "enabled:hover:text-yellow-500";
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
  type = "button",
  styleIcon,
  handleMousePress,
  handleMouseUp,
  handleMouseLeave,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseDown={handleMousePress}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={isDisabled || isPending}
      className={`w-full border-2 rounded-xl py-2 px-4 enabled:cursor-pointer  flex items-center gap-5 justify-center group z-20 bg-neutral-950 disabled:opacity-50  btn__logic_md h-fit 
        transition-colors duration-300 ${getCol(act ?? BtnAct.INFO)} `}
    >
      {isPending ? (
        <MiniSpinner {...{ act }} />
      ) : (
        <el.icon className={`${styleIcon ?? "icon__sm"}`} />
      )}
      {el?.label && (
        <span className={`txt__3 ${styleTxt ?? ""}`}>
          {isPending ? el.pendingLabel ?? el.label : el.label}
        </span>
      )}
    </button>
  );
};
export default ButtonIcon;
