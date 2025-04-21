import { FC } from "react";
import { SideFieldType } from "../../../../config/fields/fields.ts";
import { NavLink } from "react-router-dom";

type PropsType = {
  el: SideFieldType;
  handleSideClick: () => void;
};

const SideLink: FC<PropsType> = ({ el, handleSideClick }) => {
  return (
    <NavLink
      onClick={handleSideClick}
      to={el.path}
      className="w-fit flex justify-start gap-5 group el__after_below items-center nav_link"
    >
      <el.icon className="icon__with_txt icon__md" />
      <span className="txt__2 el__flow group-hover:text-blue-600">
        {el.label}
      </span>
    </NavLink>
  );
};
export default SideLink;
