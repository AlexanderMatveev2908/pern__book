import { FC, useEffect, useRef } from "react";
import s from "./TooltipCpy.module.css";

type PropsType = {
  txt: string;
  bd?: boolean;
  align?: string;
};

const TooltipCpy: FC<PropsType> = ({ txt, bd = true }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const toolRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animate = (e: MouseEvent) => {
      if (
        btnRef.current &&
        toolRef.current &&
        btnRef.current.contains(e.target as Node)
      ) {
        toolRef.current.classList.remove(s.tool);
        requestAnimationFrame(() => toolRef?.current?.classList.add(s.tool));
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
    <>
      <div className="w-fit h-full flex justify-start max-w-full overflow-x-auto">
        <button
          onClick={handleClick}
          disabled={!txt}
          type="button"
          aria-label="copy to clipboard"
          ref={btnRef}
          className="flex appearance-none outline-0 w-full max-w-full h-full left-0 relative overflow-x-auto"
        >
          {txt && (
            <div
              className={`cursor-pointer flex w-full max-w-full el__flow overflow-x-auto ${
                bd
                  ? "el__border_sm px-6 py-1 items-center"
                  : "hover:text-blue-600"
              }`}
            >
              <span className={`txt__2 text-nowrap ${!bd ? "pb-3" : ""}`}>
                {txt}
              </span>
            </div>
          )}
        </button>
      </div>

      <div
        className="absolute pointer-events-none tooltip_cpy left-1/2 -translate-x-1/2"
        style={{
          top: `calc(-100% - 7.5px) `,
        }}
      >
        <div
          ref={toolRef}
          className="el__border_sm h-full -top-[80px] py-1 px-5 z-60 bg-[#000] -right-[20px] min-w-[250px] flex justify-center tooltip pointer-events-none"
          style={{
            opacity: "0",
            transform: "scale(0)",
          }}
        >
          <span className="txt__1">Copied to clipboard</span>
        </div>
      </div>
    </>
  );
};
export default TooltipCpy;
