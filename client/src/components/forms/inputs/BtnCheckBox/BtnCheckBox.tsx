import { capt } from "@/core/lib/lib";
import { FC, useState } from "react";
import "./BtnCheckBox.css";
import { IconType } from "react-icons/lib";

type PropsType = {
  handleClick: () => void;
  isIn: boolean;
  label?: string;
  Icon?: IconType;
};

const BtnCheckBox: FC<PropsType> = ({ handleClick, isIn, label, Icon }) => {
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
      className={`w-full max-w-[275px] rounded-xl px-5 py-2 flex gap-5 justify-center 
     appearance-none outline-0 items-center transition-all duration-300 cursor-pointer btn_checkbox ${
       isIn ? "border-blue-600 text-blue-600" : ""
     }`}
      style={
        {
          // ? IF JUST REMOVED AVOID MAKING IT SCALE BIGGER SO IS CLEAR THAT USER REMOVED A THING FROM A LIST
          "--scale_btn_check_hover": isRemoved ? 1 : 1.15,
          // ? SAME AS ABOVE, LEAVE BTN AS DEFAULT IF REMOVED SO IS CLEARED CLICK WORKED AND DID HIS JOB
          "--color_btn_check": isRemoved
            ? "var(--gray__app)"
            : "var(--blue__app)",
          // ? JUST A BASIC SCALE
          "--scale_btn_check": !isRemoved && (isHover || isIn) ? 1.15 : 1,

          "--border_btn_check":
            !isRemoved && (isIn || isHover)
              ? "var(--blue__app)"
              : "var(--gray__app_500)",
        } as React.CSSProperties
      }
    >
      {Icon ? <Icon className="icon__md" /> : null}
      {label ? <span className="txt__2">{capt(label)}</span> : null}
    </button>
  );
};

export default BtnCheckBox;
