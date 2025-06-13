import { useState, type FC } from "react";
import s from "./CardInfo.module.css";

type PropsType = {
  CompSVG: React.ElementType;
  txt: string;
};

const CardInfo: FC<PropsType> = ({ CompSVG, txt }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className={`${
        s.card
      } w-full max-w-fit sm:max-w-[800px] el__border_md p-5 sm:p-8 grid grid-cols-1 gap-x-14 gap-y-6  justify-self-center transition-all duration-[0.4s] ${
        isHover ? "el__shadow_md" : ""
      }`}
    >
      <div className="w-full max-w-[75%] sm:max-w-[300px] flex justify-center items-center justify-self-center">
        <CompSVG
          {...{
            className: "w-full h-full",
          }}
        />
      </div>
      <div className="w-full max-w-fit flex justify-center h-full items-center">
        <span className="txt__3">{txt}</span>
      </div>
    </div>
  );
};

export default CardInfo;
