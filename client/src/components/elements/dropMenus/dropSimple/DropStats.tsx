/* eslint-disable @typescript-eslint/no-explicit-any */
import DropHandler from "@/components/elements/dropMenus/DropHandler";
import { tailwindBreak } from "@/core/config/breakpoints";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { clampBy } from "@/core/lib/lib";
import { FC, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  el?: {
    label: string;
    icon?: IconType;
  };
  fields?:
    | {
        val?: any;
        label: string;
      }[]
    | null;
  children?: ReactNode | React.ReactNode[] | null;
  styleUL?: string;
  styleTxt?: string;
  abs?: boolean;
  border?: boolean;
  ovHidden?: boolean;
  listen?: boolean;
  sizeHandler?: "sm" | "md";
};

const DropStats: FC<PropsType> = ({
  el,
  fields,
  children,
  border,
  styleUL,
  abs,
  ovHidden,
  listen,
  styleTxt,
  sizeHandler,
}) => {
  const [isDropOpen, setIsDropOpen] = useState(
    !listen ? false : window.innerWidth > tailwindBreak.md
  );

  useEffect(() => {
    const resize = () => {
      if (!listen) return null;
      const res = window.innerWidth > tailwindBreak.md;
      if (res !== isDropOpen) setIsDropOpen(res);
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [listen, isDropOpen]);

  const ids = useCreateIds({ lengths: [fields?.length ?? 0] });

  return !el ? null : (
    <div className="w-full relative h-fit">
      <div className="w-full pr-3">
        <DropHandler
          {...{ isDropOpen, setIsDropOpen, size: sizeHandler, el, styleTxt }}
        />
      </div>

      {border && (
        <hr
          className="h-[3px] w-full border-0 
           bg-blue-600 mt-3"
        />
      )}

      <ul
        className={`w-full grid grid-cols-1 items-start transition-all duration-[0.4s] gap-3 ${
          isDropOpen ? "mt-3" : ""
        } ${ovHidden ? "overflow-hidden" : ""} ${
          abs
            ? "absolute top-0 left-0 bg-neutral-950 z-50 el__border_sm p-3"
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
          fields?.map((el, i) => (
            <li
              key={ids?.[0]?.[i]}
              className="w-full flex justify-between items-center pr-4 gap-3"
            >
              <div
                className={`flex justify-start ${abs ? "min-w-[75px]" : ""}`}
              >
                <span className="txt__2 clamp_txt" {...clampBy(4)}>
                  {el.label}
                </span>
              </div>

              <div className="w-fit flex justify-end">
                <span
                  className="txt__2 text-wrap clamp_txt text-right"
                  {...clampBy(3)}
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
