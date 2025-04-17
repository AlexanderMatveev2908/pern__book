import { FC, useEffect, useRef } from "react";
import "./TooltipCpy.css";

type PropsType = {
  txt: string;
};

const TooltipCpy: FC<PropsType> = ({ txt }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const toolRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animate = (e: MouseEvent) => {
      if (
        btnRef.current &&
        toolRef.current &&
        btnRef.current.contains(e.target as Node)
      ) {
        toolRef.current.classList.remove("el__tooltip");
        requestAnimationFrame(() =>
          toolRef?.current?.classList.add("el__tooltip")
        );
      }
    };

    document.addEventListener("mousedown", animate);
    return () => document.removeEventListener("mousedown", animate);
  }, []);

  const handleCLick = async () => {
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      //
    }
  };

  return (
    <button
      onClick={handleCLick}
      type="button"
      ref={btnRef}
      className="relative w-full flex justify-start"
    >
      {txt && (
        <div className="el__cpy_txt appearance-none el__border_sm py-1 px-5 cursor-pointer">
          <span className="txt__2">{txt}</span>
        </div>
      )}

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
    </button>
  );
};
export default TooltipCpy;
