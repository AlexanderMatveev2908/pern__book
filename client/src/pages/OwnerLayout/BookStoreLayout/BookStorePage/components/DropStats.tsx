import DropHandler from "@/components/elements/DropHandler/DropHandler";
import { tailwindBreak } from "@/core/config/breakpoints";
import { LabelStoreType } from "@/core/config/fieldsData/bookStore/actions";
import { FC, useEffect, useState } from "react";

type PropsType = {
  el?: LabelStoreType;
  fields?:
    | {
        id: string;
        val?: string | number;
        label: string;
      }[]
    | null;
  children?: React.ReactNode[] | null;
};

const DropStats: FC<PropsType> = ({ el, fields, children }) => {
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

      {isDropOpen && (
        <hr
          className={`bg-blue-600 h-[3px] w-full border-0 my-2 ${isDropOpen}`}
        />
      )}

      <ul
        className={`w-full grid transition-all duration-300 gap-3 ${
          isDropOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {fields === null
          ? children
          : fields?.map((el) => (
              <li
                key={el.id}
                className="w-full flex justify-between items-center py-3 pr-4"
              >
                <span className="txt__2">{el.label}</span>

                <span className="txt__2">{el?.val}</span>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default DropStats;
