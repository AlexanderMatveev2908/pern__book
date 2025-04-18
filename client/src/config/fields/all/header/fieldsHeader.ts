import { v4 } from "uuid";
import {
  AuthPagesPathType,
  fieldsActionsAuth,
} from "../general/fieldsActionsAuth";
import { FaUserSecret } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

export interface DropFieldType {
  id?: string;
  label: string;
  path: AuthPagesPathType | string;
  icon: IconType;
}

export const fieldsHeaderDropNonLogged: DropFieldType[] = fieldsActionsAuth.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

const verifyAccountField = fieldsActionsAuth.find(
  (el) => el.path === AuthPagesPathType.VERIFY_EMAIL
);

export const fieldsHeaderDropLogged = [
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
})) as DropFieldType[];
