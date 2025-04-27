import { capt } from "@/lib/lib";
import { FC, useState } from "react";
import "./BtnCheckBox.css";

type PropsType = {
  handleClick: () => void;
  isIn: boolean;
  val: string;
};

const BtnCheckBox: FC<PropsType> = ({ handleClick, isIn, val }) => {
  const [isHover, setIsHover] = useState(false);
  const [isRemoved, setRemoved] = useState(false);

  return (
    <button
      onClick={() => {
        setRemoved(isIn);
        handleClick();
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        if (isRemoved) setRemoved(false);

        setIsHover(false);
      }}
      type="button"
      className={`min-w-[250px] max-w-[275px] rounded-xl px-5 py-2 flex justify-center 
     appearance-none outline-0 items-center transition-all duration-300 cursor-pointer btn__checkbox ${
       isIn ? "border-blue-600 text-blue-600" : ""
     }`}
      style={
        {
          "--scale_btn_check_hover": isRemoved ? 1 : 1.2,
          "--color_btn_check": isRemoved
            ? "var(--gray__app)"
            : "var(--blue__app)",
          "--scale_btn_check": !isRemoved && !isHover && isIn ? 1.2 : 1,
          "--border_btn_check": isRemoved
            ? "var(--gray__app_500)"
            : isIn || isHover
            ? "var(--blue__app)"
            : "var(--gray__app_500)",
        } as React.CSSProperties
      }
    >
      <span className="txt__2">{capt(val)}</span>
    </button>
  );
};

export default BtnCheckBox;
