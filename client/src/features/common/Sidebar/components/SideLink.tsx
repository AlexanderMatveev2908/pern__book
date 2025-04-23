import { SideFieldType } from "@/config/fields/Sidebar/sidebarFields";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIsSideOpen } from "../../Header/headerSlice";
import { LinksLoggedDrop } from "@/config/fields/general/linkFieldsLogged";
import { AllowedFromApp } from "@/types/types";

type PropsType = {
  el: SideFieldType;
};

const SideLink: FC<PropsType> = ({ el }) => {
  const dispatch = useDispatch();
  const handleSideClick = () => dispatch(setIsSideOpen(false));

  const to =
    el.path === LinksLoggedDrop.MANAGE_ACCOUNT
      ? LinksLoggedDrop.SECURITY
      : el.path;
  const state =
    el.path === LinksLoggedDrop.MANAGE_ACCOUNT
      ? { from: AllowedFromApp.GEN }
      : null;

  return (
    <NavLink
      onClick={handleSideClick}
      {...{ to, state }}
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
