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
};

const DropStats: FC<PropsType> = ({ el, fields, children, styleUL }) => {
  const [isDropOpen, setIsDropOpen] = useState(
    window.innerWidth > tailwindBreak.md
  );

  useEffect(() => {
    const resize = () => setIsDropOpen(window.innerWidth > tailwindBreak.md);

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return !el ? null : (
    <div>
      <DropHandler {...{ isDropOpen, setIsDropOpen, el }} />

      <hr
        className={`bg-blue-600 h-[3px] w-full border-0 my-3 ${isDropOpen}`}
      />

      <ul
        className={`w-full grid transition-all duration-300 gap-3 ${
          isDropOpen
            ? `${styleUL ?? "max-h-[500px]"} opacity-100`
            : "max-h-0 opacity-0"
        }`}
      >
        {Array.isArray(fields) &&
          fields?.map((el) => (
            <li
              key={el.id}
              className="w-full flex justify-between items-center pr-4 gap-3"
            >
              <div className="flex justify-start">
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
