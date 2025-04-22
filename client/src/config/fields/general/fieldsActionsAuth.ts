import { FaKey, FaRegCheckCircle } from "react-icons/fa";
import { LuUserPen } from "react-icons/lu";
import { MdLogin } from "react-icons/md";

export enum AuthPagesPathType {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  FORGOT_PASSWORD = "/auth/forgot-pwd",
  VERIFY_EMAIL = "/auth/verify-account",
}

export const fieldsActionsAuth = [
  {
    label: "Register",
    path: AuthPagesPathType.REGISTER,
    icon: LuUserPen,
  },
  {
    label: "Login",
    path: AuthPagesPathType.LOGIN,
    icon: MdLogin,
  },
  {
    label: "Verify email",
    path: AuthPagesPathType.VERIFY_EMAIL,
    icon: FaRegCheckCircle,
  },
  {
    label: "Recover account",
    path: AuthPagesPathType.FORGOT_PASSWORD,
    icon: FaKey,
  },
];

export const verifyAccountField = fieldsActionsAuth.find(
  (el) => el.path === AuthPagesPathType.VERIFY_EMAIL
);
