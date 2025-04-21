import { FC, useEffect, useRef, useState } from "react";
import "./Button.css";
import { v4 } from "uuid";
import { makeRandomMinMax } from "../../../../lib/lib.ts";
import { SpinnerBtn } from "@/components/components.ts";

const makeRandomBtn = () => makeRandomMinMax(-1200, 1200);

type PropsType = {
  isAging?: boolean;
  isPending?: boolean;
  type?: "button" | "submit";
  label?: string;
  Icon?: React.ElementType;
  isDisabled: boolean;
};

const Button: FC<PropsType> = ({
  isAging,
  isPending,
  label,
  type = "submit",
  Icon,
  isDisabled,
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

          curr.classList.remove("el__bubble");
          requestAnimationFrame(() => curr.classList.add("el__bubble"));
          i++;
        } while (i < ids.length);
      }
    };

    document.addEventListener("mousedown", animate);
    return () => document.removeEventListener("mousedown", animate);
  }, [ids]);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    if (isAging) {
      timer.current = setTimeout(() => {
        setCanLoad(true);
        clearTimer();
      }, 200);
    }

    return () => {
      clearTimer();
    };
  }, [isAging]);

  useEffect(() => {
    if (!isAging) {
      setCanLoad(false);
      clearTimer();
    }
  }, [isAging]);

  return canLoad && isAging ? (
    <div className="w-full flex justify-center">
      <SpinnerBtn />
    </div>
  ) : (
    <button
      type={type}
      ref={btnRef}
      disabled={isDisabled || isPending}
      className={`appearance-none w-full el__border_sm py-2 px-10 flex justify-center items-center disabled:opacity-50 ${"btn__container"}`}
    >
      {/* <div ref={bubbleRefs}></div> */}
      {ids.map((id, i) => (
        <div
          key={id}
          {...{ id }}
          className={`absolute bottom-1/2 rounded-full pointer-events-none ${
            i % 2 === 0
              ? "w-[8px] h-[8px] border-2 border-blue-600"
              : "h-[5px] w-[5px] bg-blue-600"
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
      <div className="w-full flex justify-center items-center gap-5">
        {Icon && <Icon className="icon__sm" />}

        <span className="txt__3">{isPending ? "Pending..." : label}</span>
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
