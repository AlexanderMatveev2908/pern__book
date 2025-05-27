import { FC, useEffect, useRef } from "react";

type PropsType = {
  txt: string;
  bd?: boolean;
  align?: string;
};

const TooltipCpy: FC<PropsType> = ({ txt, align, bd = true }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const toolRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animate = (e: MouseEvent) => {
      if (
        btnRef.current &&
        toolRef.current &&
        btnRef.current.contains(e.target as Node)
      ) {
        toolRef.current.classList.remove("tool");
        requestAnimationFrame(() => toolRef?.current?.classList.add("tool"));
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
      aria-label="copy to clipboard"
      ref={btnRef}
      className="tooltip_cpy relative w-full flex appearance-none outline-0  max-w-full h-full"
    >
      {txt && (
        <div
          className={`py-1 cursor-pointer flex w-fit max-w-full overflow-x-auto ${
            bd
              ? "el__border_sm tooltip_cpy__el__cpy_txt justify-center px-4"
              : `hover:text-blue-600 el__flow justify-start absolute overflow-x-auto scroll_x scroll_app min-h-full top-0 ${
                  align ?? "left-0"
                }`
          }
          }`}
        >
          <span
            className="txt__2 w-fit text-nowrap"
            style={
              {
                // lineClamp: 1,
                // WebkitLineClamp: 1,
              }
            }
          >
            {txt}
          </span>
        </div>
      )}

      <div
        ref={toolRef}
        className="absolute el__border_sm -top-[40px] py-1 px-5 z-60 bg-[#000] right-0 min-w-[250px] flex justify-center tooltip pointer-events-none"
        style={{
          opacity: "0",
          transform: "scale(0)",
        }}
      >
        <span className="txt__1">Copied to clipboard</span>
      </div>
    </button>
  );
};
export default TooltipCpy;
