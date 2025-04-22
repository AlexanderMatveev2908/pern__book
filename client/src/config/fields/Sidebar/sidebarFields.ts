import { GoHome } from "react-icons/go";
import { FaBook } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { v4 } from "uuid";
import { RiAccountBoxLine } from "react-icons/ri";
import { LabelDropType } from "../../../types/types";
import { fieldsActionsAuth } from "../../all/general/fieldsActionsAuth";
import { ShieldCheck } from "lucide-react";
import { userLoggedFieldsDrop } from "../general/userFields";

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

export const sideFieldsLogged = [...(userLoggedFieldsDrop ?? [])].map((el) => ({
  ...el,
  id: v4(),
})) as SideFieldType[];
