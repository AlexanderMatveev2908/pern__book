import { ReactNode, useState, type FC } from "react";
import DropHandler from "../../DropHandler/DropHandler";
import { IconType } from "react-icons/lib";

type PropsType = {
  el?: {
    label?: string;
    icon?: IconType;
  };
  children: ReactNode | ReactNode[];
  border?: boolean;
};

const DropStatsStatic: FC<PropsType> = ({ el, children, border }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropHandler {...{ isDropOpen, setIsDropOpen, el }} />

      {border && <hr className="bg-blue-600 border-0 w-full h-[3px] -mt-2" />}

      <div
        className={`transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 pointer-events-none max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropStatsStatic;
