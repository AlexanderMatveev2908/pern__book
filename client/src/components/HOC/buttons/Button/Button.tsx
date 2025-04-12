import { FC, useEffect, useRef } from "react";
import style from "./Button.module.css";

// const makeRandomMinMax = (min: number, max: number) =>
//   Math.random() * (max - min) + min;

const Button: FC = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const bubbleRefs = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const makeBubbles = () => {};
  }, []);

  useEffect(() => {
    const animate = (e: MouseEvent) => {
      if (btnRef.current && bubbleRefs.current)
        if (btnRef.current.contains(e.target as Node)) {
          bubbleRefs.current.classList.remove(style.bubbles);
          requestAnimationFrame(() => {
            bubbleRefs.current?.classList.add(style.bubbles);
          });
        }
    };

    document.addEventListener("mousedown", animate);

    return () => document.removeEventListener("mousedown", animate);
  }, []);

  return (
    <button
      ref={btnRef}
      className={`appearance-none min-w-full border-2 border-blue-600 rounded-xl py-2 px-10 flex justify-center items-center ${style.btn__container}`}
    >
      <div ref={bubbleRefs}></div>
      <span className="txt__3">Button</span>
    </button>
  );
};
export default Button;
