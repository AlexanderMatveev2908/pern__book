import { FC } from "react";
import { SideFieldType } from "../../../config/fields/Sidebar/sidebarFields";
import style from "../Sidebar.module.css";

type PropsType = {
  el: SideFieldType;
  isIn: boolean;
};

const SideLink: FC<PropsType> = ({ el, isIn }) => {
  return (
    <div
      className={`w-fit flex justify-start gap-5 group el__after_below items-center ${
        isIn ? style.el__active : ""
      }`}
    >
      <el.icon className="icon__with_txt icon__md" />
      <span
        className={`txt__2 el__flow group-hover:text-blue-600 font-semibold `}
      >
        {el.label}
      </span>
    </div>
  );
};
export default SideLink;
