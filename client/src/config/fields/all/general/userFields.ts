import { FaUserGear } from "react-icons/fa6";
import { verifyAccountField } from "./fieldsActionsAuth";
import { FaUserSecret } from "react-icons/fa";

export const userLoggedFieldsDrop = [
  {
    label: "Profile",
    path: "/user/profile-settings",
    icon: FaUserGear,
  },
  verifyAccountField,
  {
    label: "Manage Account",
    path: "/user/manage-account",
    icon: FaUserSecret,
  },
];

export const namesFields = [
  {
    field: "firstName",
    label: "First Name",
    place: "Your First Name...",
  },
  {
    field: "lastName",
    label: "Last Name",
    place: "Your Last Name...",
  },
];
