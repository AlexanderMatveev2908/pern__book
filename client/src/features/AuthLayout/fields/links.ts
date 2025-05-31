import { FaKey, FaRegCheckCircle, FaUserSecret } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { LuUserPen } from "react-icons/lu";
import { MdLogin } from "react-icons/md";

export enum AuthPagesPathType {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  FORGOT_PASSWORD = "/auth/forgot-pwd",
  VERIFY_EMAIL = "/auth/verify-account",
}

export enum LinksLoggedDrop {
  PROFILE = "/user/profile-settings",
  VERIFY_EMAIL_LOGGED = "/user/verify-account",
  SECURITY = "/user/security",
  MANAGE_ACCOUNT = "/user/manage-account",
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

export const userLoggedFieldsDrop = [
  {
    label: "Profile",
    path: "/user/profile-settings",
    icon: FaUserGear,
  },
  {
    label: "Verify email",
    path: LinksLoggedDrop.VERIFY_EMAIL_LOGGED,
    icon: FaRegCheckCircle,
  },
  {
    label: "Manage Account",
    path: "/user/manage-account",
    icon: FaUserSecret,
  },
];
