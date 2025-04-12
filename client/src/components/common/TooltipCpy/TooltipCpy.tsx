import { FC, useEffect, useRef } from "react";
import "./TooltipCpy.css";

const TooltipCpy: FC = () => {
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

  return (
    <button
      type="button"
      ref={btnRef}
      className="relative w-full flex justify-center"
    >
      <div className="el__cpy_txt border-2 appearance-none border-blue-600 py-1 px-5 rounded-xl cursor-pointer">
        <span className="txt__2">sssssssssssssssssss</span>
      </div>

      <div
        ref={toolRef}
        className="absolute border-2 border-blue-600 rounded-xl -top-[120%] py-1 px-5 z-60 bg-[#000] right-1/2 translate-x-1/2 min-w-[200px] flex justify-center tooltip"
        style={{
          opacity: "0",
          transform: "scale(0) translateY(50px)",
        }}
      >
        <span className="txt__1">Copied Clipboard</span>
      </div>
    </button>
  );
};
export default TooltipCpy;
