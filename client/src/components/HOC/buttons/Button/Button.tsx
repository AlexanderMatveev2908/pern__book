import { FC, useRef } from "react";
import style from "./Button.module.css";

// const makeRandomMinMax = (min: number, max: number) =>
//   Math.random() * (max - min) + min;

const Button: FC = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <button
      ref={btnRef}
      className={`appearance-none min-w-full border-2 border-blue-600 rounded-xl py-2 px-10 flex justify-center items-center ${style.btn__container}`}
    >
      <span className="txt__3">Button</span>
    </button>
  );
};
export default Button;
