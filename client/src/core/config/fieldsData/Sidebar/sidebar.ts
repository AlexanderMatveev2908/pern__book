import { GoHome } from "react-icons/go";
import { FaBook, FaPenFancy } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { v4 } from "uuid";
import { RiAccountBoxLine, RiBookShelfFill } from "react-icons/ri";
import { BriefcaseBusiness, MonitorCog, ShieldCheck } from "lucide-react";
import {
  fieldsActionsAuth,
  userLoggedFieldsDrop,
} from "../general/fieldsActionsAuth";
import { addArrIDs } from "@/core/lib/all/utils/ids";
import { MdAddBusiness } from "react-icons/md";
import { HiLibrary } from "react-icons/hi";
import { LabelDropType } from "@/types/types";

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
    path: "/books",
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

export const fieldAdminDrop: LabelDropType = {
  label: "Admin area",
  icon: MonitorCog,
};

export const sideFieldsAdmin: SideFieldType[] = addArrIDs([
  {
    label: "Open a bookstore",
    icon: MdAddBusiness,
    path: "/owner/book-store/create",
  },
  {
    label: "My Bookstores",
    icon: HiLibrary,
    path: "/owner/book-store/book-stores",
  },
  {
    label: "My Books",
    icon: RiBookShelfFill,
    path: "/owner/books/list",
  },
  {
    label: "Add Book",
    icon: FaPenFancy,
    path: "/owner/books/add-book",
  },
  // {
  //   label: "My Team",
  //   icon: FaUsers,
  //   path: "/owner/team",
  // },
]);

export const ownerOnlyPaths = [
  "/owner/book-store/book-stores",
  "/owner/books/add-book",
];

export const createStoreField = sideFieldsAdmin[0];

export const fieldWorkerDrop: LabelDropType = {
  label: "Worker area",
  icon: BriefcaseBusiness,
};

export const sideFieldsWorker: SideFieldType[] = [
  {
    label: "Bookstores",
    icon: HiLibrary,
    path: "/worker/book-stores/list",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
