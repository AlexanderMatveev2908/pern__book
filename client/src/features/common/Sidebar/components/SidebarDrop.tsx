import { FC, useState } from "react";
import SideLink from "./SideLink.tsx";
import { DropHandler } from "@/components/components.ts";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice.ts";
import { AllowedFromApp, UserType } from "@/types/types.ts";
import {
  fieldAccountLogged,
  fieldAccountNonLogged,
  sideFieldsLogged,
  sideFieldsNonLogged,
} from "@/config/fields/Sidebar/sidebarFields.ts";
import { AuthPagesPathType } from "@/config/fields/general/fieldsActionsAuth.ts";
import { LinksLoggedDrop } from "@/config/fields/general/linkFields.ts";
import { useNavigate } from "react-router-dom";
import { setIsSideOpen } from "../../Header/headerSlice.ts";

type PropsType = {
  user: UserType | null;
};

const SidebarDrop: FC<PropsType> = ({ user }) => {
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  const nav = useNavigate();

  const authState = useSelector(getAuthState);

  const dispatch = useDispatch();
  const handleSideClick = () => dispatch(setIsSideOpen(false));

  const arg = authState.isLogged ? sideFieldsLogged : sideFieldsNonLogged;
  const label = authState.isLogged ? fieldAccountLogged : fieldAccountNonLogged;

  const specialCLick = () =>
    nav("/user/security", { state: { from: AllowedFromApp.GEN } });

  return (
    <div className={`w-full grid ${isDropOpen ? "" : ""}`}>
      <DropHandler {...{ isDropOpen, setIsDropOpen, el: label }} />
      <div
        className={`w-full grid el__flow ${
          isDropOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } `}
      >
        <div
          className={`grid gap-5 el__flow  ${
            isDropOpen ? "pt-5" : "-translate-y-[50px]"
          }`}
        >
          {arg.map((el) =>
            el.path === AuthPagesPathType.VERIFY_EMAIL &&
            user?.isVerified ? null : el.path ===
              LinksLoggedDrop.MANAGE_ACCOUNT ? (
              <div
                onClick={() => {
                  specialCLick();
                  handleSideClick();
                }}
                className="w-fit flex justify-start gap-5 group el__after_below items-center nav_link"
              >
                <el.icon className="icon__with_txt icon__md" />
                <span className="txt__2 el__flow group-hover:text-blue-600">
                  {el.label}
                </span>
              </div>
            ) : (
              <SideLink key={el.id} {...{ el, handleSideClick }} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default SidebarDrop;
