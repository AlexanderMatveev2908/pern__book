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
  styleTxt?: string;
  styleIcon?: string;
};

const DropHandler: FC<PropsType> = ({
  isDropOpen,
  setIsDropOpen,
  el,
  styleTxt,
  styleIcon,
}) => {
  return !el ? null : (
    <div
      onClick={() => setIsDropOpen(!isDropOpen)}
      className="w-full grid grid-cols-[1fr_50px] relative group cursor-pointer items-center"
    >
      <div className="w-fit flex gap-5 justify-start items-center">
        {el.icon && <el.icon className="icon__md icon__with_txt" />}

        <span
          className={`group-hover:text-blue-600 el__flow clamp_txt ${
            styleTxt ?? "txt__3"
          }`}
          style={{
            lineClamp: 1,
            WebkitLineClamp: 1,
          }}
        >
          {el.label}
        </span>
      </div>

      <div className="w-full h-full items-center flex justify-end">
        <FaChevronDown
          className={`icon__with_txt justify-self-end ${
            styleIcon ?? "icon__sm"
          } ${isDropOpen ? "rotate-180" : ""} `}
        />
      </div>
    </div>
  );
};
export default DropHandler;
