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
  size?: "sm" | "md";
};

const DropHandler: FC<PropsType> = ({
  isDropOpen,
  setIsDropOpen,
  el,
  styleTxt,
  size = "md",
}) => {
  return !el ? null : (
    <div
      onClick={() => setIsDropOpen(!isDropOpen)}
      className="w-full grid grid-cols-[1fr_50px] relative group cursor-pointer items-center hover:text-blue-600"
    >
      <div className="w-fit flex gap-5 justify-start items-center">
        {el.icon && (
          <el.icon
            className={`  el__flow ${size === "md" ? "icon__md" : "icon__sm"}`}
          />
        )}

        <span
          className={`el__flow clamp_txt ${
            styleTxt ? styleTxt : size === "md" ? "txt__3" : "txt__2"
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
          className={`justify-self-end el__flow ${
            size === "sm" ? "icon__xs" : "icon__sm"
          } ${isDropOpen ? "rotate-180" : ""} `}
        />
      </div>
    </div>
  );
};
export default DropHandler;
