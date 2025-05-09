/* eslint-disable @typescript-eslint/no-explicit-any */
import DropHandler from "@/components/elements/DropHandler/DropHandler";
import { tailwindBreak } from "@/core/config/breakpoints";
import { FC, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  el?: {
    label: string;
    icon: IconType;
  };
  fields?:
    | {
        id: string;
        val?: any;
        label: string;
      }[]
    | null;
  children?: ReactNode | React.ReactNode[] | null;
  styleUL?: string;
  abs?: boolean;
};

const DropStats: FC<PropsType> = ({ el, fields, children, styleUL, abs }) => {
  const [isDropOpen, setIsDropOpen] = useState(
    window.innerWidth > tailwindBreak.md
  );

  useEffect(() => {
    const resize = () =>
      abs ? null : setIsDropOpen(window.innerWidth > tailwindBreak.md);

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [abs]);

  return !el ? null : (
    <div className="w-full relative">
      <DropHandler {...{ isDropOpen, setIsDropOpen, el }} />

      <hr className="bg-blue-600 h-[3px] w-full border-0 my-3" />

      <ul
        className={`w-full grid transition-all duration-[0.4s] gap-3 ${
          abs
            ? "absolute top-0 left-0 bg-neutral-950 z-50 border-2 border-blue-600 p-3 rounded-xl"
            : ""
        } ${
          abs
            ? isDropOpen
              ? "opacity-100"
              : "translate-y-[50px] pointer-events-none opacity-0"
            : isDropOpen
            ? `${styleUL ?? "max-h-[500px]"} opacity-100`
            : "max-h-0 opacity-0"
        }`}
        style={{
          transform: abs && isDropOpen ? "translateY(calc(-100% - 20px))" : "",
        }}
      >
        {Array.isArray(fields) &&
          fields?.map((el) => (
            <li
              key={el.id}
              className="w-full flex justify-between items-center pr-4 gap-3"
            >
              <div
                className={`flex justify-start ${abs ? "min-w-[75px]" : ""}`}
              >
                <span
                  className="txt__2 clamp_txt"
                  style={{
                    lineClamp: 4,
                    WebkitLineClamp: 4,
                  }}
                >
                  {el.label}
                </span>
              </div>

              <div className="w-fit flex justify-end">
                <span
                  className="txt__2 text-wrap clamp_txt text-right"
                  style={{
                    lineClamp: 3,
                    WebkitLineClamp: 3,
                  }}
                >
                  {el?.val}
                </span>
              </div>
            </li>
          ))}

        {children}
      </ul>
    </div>
  );
};

export default DropStats;
