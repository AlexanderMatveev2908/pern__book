import { MiniSpinner } from "@/components/components";
import { BtnAct, BtnFieldIconType } from "@/types/types";
import { FC } from "react";

type PropsType = {
  el: BtnFieldIconType;
  act: BtnAct;
  handleCLick: () => void;
  isPending?: boolean;
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

const ButtonIcon: FC<PropsType> = ({ el, act, handleCLick, isPending }) => {
  return (
    <button
      onClick={handleCLick}
      disabled={isPending}
      type="button"
      className={`w-full border-2 rounded-xl py-2 px-4 enabled:cursor-pointer btn__logic_md flex items-center gap-4 justify-center group ${getCol(
        act
      )} `}
    >
      {isPending ? <MiniSpinner /> : <el.icon className="icon__sm" />}

      <span className="txt__3">
        {isPending ? el.pendingLabel ?? el.label : el.label}
      </span>
    </button>
  );
};
export default ButtonIcon;
