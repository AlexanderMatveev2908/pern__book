import { FC, useState } from "react";
import {
  AuthPagesPathType,
  fieldAccountLogged,
  fieldAccountNonLogged,
  sideFieldsLogged,
  sideFieldsNonLogged,
} from "../../../config/fields/fields.ts";
import SideLink from "./SideLink.tsx";
import { DropHandler } from "@/components/components.ts";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice.ts";
import { UserType } from "@/types/types.ts";

type PropsType = {
  handleSideClick: () => void;
  user: UserType | null;
};

const SidebarDrop: FC<PropsType> = ({ handleSideClick, user }) => {
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);

  const authState = useSelector(getAuthState);

  const arg = authState.isLogged ? sideFieldsLogged : sideFieldsNonLogged;
  const label = authState.isLogged ? fieldAccountLogged : fieldAccountNonLogged;
  return (
    <div className="w-full grid gap-5">
      <DropHandler {...{ isDropOpen, setIsDropOpen, el: label }} />
      <div
        className={`w-full grid el__flow ${
          isDropOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } `}
      >
        <div
          className={`grid gap-5 el__flow ${
            isDropOpen ? "" : "-translate-y-[50px]"
          }`}
        >
          {arg.map((el) =>
            el.path === AuthPagesPathType.VERIFY_EMAIL &&
            user?.isVerified ? null : (
              <SideLink key={el.id} {...{ el, handleSideClick }} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default SidebarDrop;
