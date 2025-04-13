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
    path: "/auth/login",
    icon: MdLogin,
  },
  {
    label: "Verify email",
    path: "/auth/verify-account",
    icon: FaRegCheckCircle,
  },
  {
    label: "Recover account",
    path: "/auth/forgot-pwd",
    icon: FaKey,
  },
];
