import { FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIsSideOpen } from "../../../features/common/Header/headerSlice";
import { getPropsNav } from "@/core/lib/lib";
import { SideFieldType } from "@/features/common/SideBar/fields/sidebar";

type PropsType = {
  el: SideFieldType;
};

const SideLink: FC<PropsType> = ({ el }) => {
  const dispatch = useDispatch();
  const handleSideClick = () => dispatch(setIsSideOpen(false));

  return (
    <NavLink
      onClick={handleSideClick}
      {...getPropsNav(el)}
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
