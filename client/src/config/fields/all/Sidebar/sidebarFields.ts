import { GoHome } from "react-icons/go";
import { FaBook, FaUserSecret } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { v4 } from "uuid";
import { RiAccountBoxLine } from "react-icons/ri";
import { LabelDropType } from "../../../../types/types";
import {
  fieldsActionsAuth,
  verifyAccountField,
} from "../../all/general/fieldsActionsAuth";
import { ShieldCheck } from "lucide-react";
import { FaUserGear } from "react-icons/fa6";

export type SideFieldType = {
  id: string;
  label: string;
  path: string;
  icon: IconType;
};

export const sideFieldsAllUsers: SideFieldType[] = [
  {
    label: "Home",
    path: "/",
    icon: GoHome,
  },
  {
    label: "Books",
    path: "to-do",
    icon: FaBook,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldAccountNonLogged: LabelDropType = {
  label: "Account",
  icon: RiAccountBoxLine,
};
export const sideFieldsNonLogged: SideFieldType[] = [...fieldsActionsAuth].map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

export const fieldAccountLogged: LabelDropType = {
  label: "My Account",
  icon: ShieldCheck,
};
export const sideFieldsLogged = [
  {
    label: "Profile settings",
    path: "/user/profile-settings",
    icon: FaUserGear,
  },
  verifyAccountField,
  {
    label: "Manage Account",
    path: "/user/manage-account",
    icon: FaUserSecret,
  },
].map((el) => ({
  ...el,
  id: v4(),
})) as SideFieldType[];
