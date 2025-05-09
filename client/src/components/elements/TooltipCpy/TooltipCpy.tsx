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

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      //
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!txt}
      type="button"
      ref={btnRef}
      className="relative w-full flex justify-start appearance-none min-w-full outline-0 h-full"
    >
      {txt && (
        <div className="el__cpy_txt appearance-none py-1 px-5 cursor-pointer overflow-x-auto scrollbar__x scrollbar__app w-full max-w-full el__border_sm">
          <span className="txt__2 text-nowrap block max-w-full overflow-x-auto scrollbar__x scrollbar__app">
            {txt}
          </span>
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
