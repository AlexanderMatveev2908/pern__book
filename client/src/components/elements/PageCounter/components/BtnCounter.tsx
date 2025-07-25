import { FC, useState } from "react";
import s from "./BtnCounter.module.css";

type PropsType = {
  handleClick: () => void;
  isIn: boolean;
  val: number;
  isDisabled: boolean;
};

const BtnCounter: FC<PropsType> = ({ handleClick, isIn, val, isDisabled }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
      disabled={isDisabled}
      type="button"
      className={`${
        s.btn
      } appearance-none border-3 rounded-xl px-4 py-1 flex justify-center items-center
     ${isIn || isHover ? "border-blue-600" : "border-neutral-600 "}`}
      style={
        {
          "--scale_counter_page": isIn ? 0.9 : isHover ? 1.2 : 1,
        } as React.CSSProperties
      }
    >
      <span className="txt__3">{val}</span>
    </button>
  );
};

export default BtnCounter;
