import { FC } from "react";

type PropsType = {
  toolRef: React.RefObject<HTMLDivElement | null>;
};

const TooltipTxt: FC<PropsType> = ({ toolRef }) => {
  return (
    <div
      ref={toolRef}
      className="absolute el__border_sm -top-[120%] py-1 px-5 z-60 bg-[#000] left-0 min-w-[200px] flex justify-center tooltip pointer-events-none"
      style={{
        opacity: "0",
        transform: "translateY(50px)",
      }}
    >
      <span className="txt__1">Copied to clipboard</span>
    </div>
  );
};

export default TooltipTxt;
