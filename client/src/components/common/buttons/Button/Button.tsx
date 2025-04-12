import { FC, useEffect, useRef, useState } from "react";
import "./Button.css";
import { v4 } from "uuid";
import SpinnerBtn from "../../spinners/SPinnerBtn";

const makeRandomMinMax = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const makeRandomBtn = () => makeRandomMinMax(-1200, 1200);

type PropsType = {
  isPending: boolean;
};

const Button: FC<PropsType> = ({ isPending }) => {
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

  return isPending ? (
    <SpinnerBtn />
  ) : (
    <button
      ref={btnRef}
      className={`appearance-none min-w-full border-2 border-blue-600 rounded-xl py-2 px-10 flex justify-center items-center ${"btn__container"}`}
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
      <span className="txt__3">Button</span>
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
