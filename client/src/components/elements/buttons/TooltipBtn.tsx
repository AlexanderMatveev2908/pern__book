import { BtnFieldIconType } from "@/types/types";
import { FC, useState } from "react";

type PropsType = {
  el: BtnFieldIconType;
  handleClick: () => void;
};

const TooltipBtn: FC<PropsType> = ({ handleClick, el }) => {
  const [isIn, setIsIn] = useState(false);

  return (
    <div className="absolute bottom-0 right-0">
      <button
        onMouseEnter={() => setIsIn(true)}
        onMouseLeave={() => setIsIn(false)}
        onClick={handleClick}
        type="button"
        className="appearance-none outline-0 cursor-pointer btn__logic_lg z-60"
      >
        <el.icon className="icon__md text-red-600" />
      </button>
      <div
        className={`w-[150px] absolute border-2 border-blue-600 py-1 px-3 bg-[#000] -top-[130%] -right-[100%] rounded-xl z-60 pointer-events-none transition-all duration-[0.4s] ${
          isIn ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"
        }`}
      >
        <span className="txt__1">{el.label}</span>

        <div className="absolute  h-[30px] w-[30px] right-[10%] top-[100%] overflow-hidden z-60">
          <div className="absolute border-2 border-blue-600 h-[30px] w-[30px] right-0 -top-[20px] rotate-45 bg-[#000]"></div>
        </div>
      </div>
    </div>
  );
};
export default TooltipBtn;
