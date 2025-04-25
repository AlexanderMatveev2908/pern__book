import { GoHome } from "react-icons/go";
import { FaBook } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { v4 } from "uuid";
import { RiAccountBoxLine } from "react-icons/ri";
import { LabelDropType } from "../../../types/types";
import { ShieldCheck } from "lucide-react";
import {
  fieldsActionsAuth,
  userLoggedFieldsDrop,
} from "../general/fieldsActionsAuth";
import { addArrIDs } from "@/lib/all/utils/ids";

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
export const sideFieldsNonLogged: SideFieldType[] =
  addArrIDs(fieldsActionsAuth);

export const fieldAccountLogged: LabelDropType = {
  label: "My Account",
  icon: ShieldCheck,
};

export const sideFieldsLogged = addArrIDs(userLoggedFieldsDrop);
