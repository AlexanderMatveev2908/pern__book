import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LabelDropType } from "../../../types/generalFields";

type PropsType = {
  isDropOpen: boolean;
  setIsDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
  el: LabelDropType;
};

const DropHandler: FC<PropsType> = ({ isDropOpen, setIsDropOpen, el }) => {
  return (
    <div
      onClick={() => setIsDropOpen(!isDropOpen)}
      className="w-full grid grid-cols-[1fr_50px] group cursor-pointer"
    >
      <div className="w-fit flex gap-5 justify-start items-center">
        <el.icon className="icon__md icon__with_txt" />

        <span className="txt__2 group-hover:text-blue-600 el__flow">
          {el.label}
        </span>
      </div>
      <FaChevronDown
        className={`icon__md icon__with_txt justify-self-end ${
          isDropOpen ? "rotate-180" : ""
        } `}
      />
    </div>
  );
};
export default DropHandler;
