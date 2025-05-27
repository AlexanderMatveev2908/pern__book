import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IconType } from "react-icons/lib";

type PropsType = {
  isDropOpen: boolean;
  setIsDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
  el?: {
    label?: string;
    icon?: IconType;
  };
};

const DropHandler: FC<PropsType> = ({ isDropOpen, setIsDropOpen, el }) => {
  return !el ? null : (
    <div
      onClick={() => setIsDropOpen(!isDropOpen)}
      className="w-full grid grid-cols-[1fr_50px] relative group cursor-pointer"
    >
      <div className="w-fit flex gap-5 justify-start items-center">
        {el.icon && <el.icon className="icon__md icon__with_txt" />}

        <span
          className="txt__3 group-hover:text-blue-600 el__flow clamp_txt"
          style={{
            lineClamp: 1,
            WebkitLineClamp: 1,
          }}
        >
          {el.label}
        </span>
      </div>
      <FaChevronDown
        className={`icon__md icon__with_txt justify-self-center ${
          isDropOpen ? "rotate-180" : ""
        } `}
      />
    </div>
  );
};
export default DropHandler;
