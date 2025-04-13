import { FaKey, FaRegCheckCircle } from "react-icons/fa";
import { LuUserPen } from "react-icons/lu";
import { MdLogin } from "react-icons/md";

export const fieldsActionsAuth = [
  {
    label: "Register",
    path: "/auth/register",
    icon: LuUserPen,
  },
  {
    label: "Login",
    path: "to-do",
    icon: MdLogin,
  },
  {
    label: "Verify email",
    path: "to-do",
    icon: FaRegCheckCircle,
  },
  {
    label: "Recover account",
    path: "to-do",
    icon: FaKey,
  },
];
