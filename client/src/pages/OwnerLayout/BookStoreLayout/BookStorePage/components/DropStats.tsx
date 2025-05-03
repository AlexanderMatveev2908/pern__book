import DropHandler from "@/components/elements/DropHandler/DropHandler";
import { LabelStoreType } from "@/core/config/fieldsData/bookStore/actions";
import { FC, useState } from "react";

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
  const [isDropOpen, setIsDropOpen] = useState(false);

  return !el ? null : (
    <div>
      <DropHandler {...{ isDropOpen, setIsDropOpen, el }} />

      <ul
        className={`w-full grid gap-5 transition-all duration-300 ${
          isDropOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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
