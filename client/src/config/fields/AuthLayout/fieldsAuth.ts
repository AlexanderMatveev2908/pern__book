import { v4 } from "uuid";
import { FormFieldBasic } from "../../../types/generalFields";
import { LuAtSign, LuCaseLower, LuCaseUpper } from "react-icons/lu";
import { TbNumbers } from "react-icons/tb";
import { FaRuler } from "react-icons/fa";
import { fieldsActionsAuth } from "../general/fieldsActionsAuth";
import { SideFieldType } from "../Sidebar/sidebarFields";

export const emailField = {
  field: "email",
  label: "Email",
  type: "email",
};

export const fieldsAuth__0: FormFieldBasic[] = [
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
  emailField,
].map((el) => ({
  ...el,
  id: v4(),
}));

export const passwordField = {
  field: "password",
  label: "Password",
  type: "password",
};
export const confirmPasswordField = {
  field: "confirmPassword",
  label: "Confirm Password",
  place: "Confirm Your Password...",
  type: "password",
};

export const fieldsAuth__1: FormFieldBasic[] = [
  passwordField,
  confirmPasswordField,
].map((el) => ({
  ...el,
  id: v4(),
}));

export const groupFieldsByArea = [
  fieldsAuth__0.map((el) => el.field),
  [...fieldsAuth__1.map((el) => el.field), "terms"],
];

export const charsPwd = "abcdefghilmopqzwyx"
  .split("")
  .flatMap((char) => [char.toUpperCase(), char])
  .concat("0123456789".split(""))
  .concat("~!@#$%^&*()_-=+{}[].?,'".split(""));

export const fieldsCheckReg = [
  { reg: /(?=.*[A-Z])/, icon: LuCaseUpper },
  { reg: /(?=.*[a-z])/, icon: LuCaseLower },
  { reg: /(?=.*\d)/, icon: TbNumbers },
  { reg: /(?=.*[\W_])/, icon: LuAtSign },
  { reg: /.{8,}/, icon: FaRuler },
].map((el) => ({
  ...el,
  id: v4(),
}));

const [register, login, verify, forgot] = fieldsActionsAuth;

export type FieldSwitchFormType = SideFieldType & {
  msg: string;
  msgBold: string;
};

export const fieldLoginSwitch: FieldSwitchFormType[] = [register, forgot].map(
  (el, i) => ({
    ...el,
    msg: !i ? "Don't have an' account ?" : "Forgot password ?",
    msgBold: !i ? "Register" : "Recover account",
    id: v4(),
  })
);

export const fieldsRegisterSwitch: FieldSwitchFormType[] = [login, verify].map(
  (el, i) => ({
    ...el,
    msg: !i ? "Already have an' account ?" : "Email does not arrive ?",
    msgBold: !i ? "Login" : "Resend email",
    id: v4(),
  })
);
