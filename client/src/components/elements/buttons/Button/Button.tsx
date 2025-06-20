import React, { FC, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { clearTimer, makeRandomMinMax } from "@/core/lib/lib";
import SpinnerBtn from "../../spinners/SpinnerBtn/SpinnerBtn";
import { BtnAct } from "@/types/types";
import MiniSpinner from "../../spinners/MiniSpinner/MiniSpinner";
import s from "./Button.module.css";

const makeRandomBtn = () => makeRandomMinMax(-1200, 1200);

type PropsType = {
  isAging?: boolean;
  isPending?: boolean;
  type?: "button" | "submit";
  label?: string;
  Icon?: React.ElementType;
  isDisabled?: boolean;
  act?: BtnAct;
  styleTxt?: string;
  handleClick?: () => void;
  handleMousePress?: () => void;
  testID?: string;
  aria?: string;
};

const style = new Map([
  [
    BtnAct.DEL,
    {
      border: "border-red-600",
      bg: "bg-red-600",
      cssVar: "--red__app",
      text: "enabled:hover:text-red-600",
    },
  ],
  [
    BtnAct.DO,
    {
      border: "border-green-600",
      bg: "bg-green-600",
      cssVar: "--green__app",
      text: "enabled:hover:text-green-600",
    },
  ],
  [
    BtnAct.INFO,
    {
      border: "border-blue-600",
      bg: "bg-blue-600",
      cssVar: "--blue__app",
      text: "enabled:hover:text-blue-600",
    },
  ],
]);

const Button: FC<PropsType> = ({
  isAging,
  isPending,
  label,
  type = "submit",
  Icon,
  isDisabled,
  act = BtnAct.INFO,
  handleClick,
  styleTxt,
  handleMousePress,
  aria,
  testID,
}) => {
  const [canLoad, setCanLoad] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  // const bubbleRefs = useRef<HTMLDivElement | null>(null);
  const [ids] = useState(Array.from({ length: 30 }, () => v4()));

  useEffect(() => {
    const animate = (e: MouseEvent) => {
      if (btnRef.current && btnRef.current.contains(e.target as Node)) {
        let i = 0;

        do {
          const curr = document.getElementById(ids[i]);
          if (!curr) {
            i++;
            continue;
          }

          curr.classList.remove(s.bubble);
          requestAnimationFrame(() => curr.classList.add(s.bubble));
          i++;
        } while (i < ids.length);
      }
    };

    document.addEventListener("mousedown", animate);
    return () => document.removeEventListener("mousedown", animate);
  }, [ids]);

  useEffect(() => {
    if (isAging) {
      timer.current = setTimeout(() => {
        setCanLoad(true);
        clearTimer(timer);
      }, 200);
    }

    return () => {
      clearTimer(timer);
    };
  }, [isAging]);

  useEffect(() => {
    if (!isAging) {
      setCanLoad(false);
      clearTimer(timer);
    }
  }, [isAging]);

  return canLoad && isAging ? (
    <div className="w-full flex justify-center">
      <SpinnerBtn />
    </div>
  ) : (
    <button
      data-testid={testID}
      aria-label={aria ?? `button for ${label}`}
      onClick={() => (typeof handleClick === "function" ? handleClick() : null)}
      onMouseDown={handleMousePress}
      type={type}
      ref={btnRef}
      disabled={isDisabled || isPending}
      className={`${
        s.button
      } appearance-none w-full border-2 rounded-xl py-2 px-5 flex justify-center items-center disabled:opacity-50  ${
        style.get(act)?.border
      } ${style.get(act)?.text}`}
      style={
        {
          "--main__btn_bg": style.get(act)?.cssVar,
        } as React.CSSProperties
      }
    >
      {/* <div ref={bubbleRefs}></div> */}
      {ids.map((id, i) => (
        <div
          key={id}
          {...{ id }}
          className={`absolute bottom-1/2 rounded-full pointer-events-none ${
            i % 2 === 0
              ? `w-[8px] h-[8px] border-2 ${style.get(act)?.border}`
              : `h-[5px] w-[5px] ${style.get(act)?.bg}`
          } `}
          style={
            {
              left: "50%",
              top: "50%",
              translate: "-50% -50%",

              "--pos": `${makeRandomBtn()}%, ${makeRandomBtn()}%`,
              transform: "scale(0)",
              opacity: "0",
            } as React.CSSProperties
          }
        ></div>
      ))}
      <div className="min-w-full flex justify-center items-center gap-5">
        {isPending ? (
          <MiniSpinner {...{ act }} />
        ) : (
          Icon && <Icon className="icon__sm" />
        )}

        {label && (
          <span className={`txt__3 ${styleTxt ?? ""}`}>
            {isPending ? "Pending..." : label}
          </span>
        )}
      </div>
    </button>
  );
};
export default Button;

// useEffect(() => {
//   const animate = (e: MouseEvent) => {
//     if (btnRef.current && bubbleRefs.current)
//       if (btnRef.current.contains(e.target as Node)) {
//         bubbleRefs.current.classList.remove("bubbles");
//         requestAnimationFrame(() => {
//           bubbleRefs.current?.classList.add("bubbles");
//         });
//       }
//   };

//   document.addEventListener("mousedown", animate);

//   return () => document.removeEventListener("mousedown", animate);
// }, []);
