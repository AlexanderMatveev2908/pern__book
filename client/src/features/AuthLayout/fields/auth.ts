import { v4 } from "uuid";
import { LuAtSign, LuCaseLower, LuCaseUpper } from "react-icons/lu";
import { TbNumbers } from "react-icons/tb";
import { FaRuler } from "react-icons/fa";
import { fieldsActionsAuth } from "./links";
import { FormFieldBasic } from "@/types/types";
import { SideFieldType } from "../../common/SideBar/fields/sidebar";

const namesFields = [
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

export const emailField = {
  field: "email",
  label: "Email",
  type: "email",
};

export const fieldsAuth__0: FormFieldBasic[] = [
  ...namesFields,
  { ...emailField, testID: "email-register" },
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

export const newPwdField = {
  ...passwordField,
  label: "New Password",
  place: "Your New Password...",
};
export const confirmNewPwd = {
  ...confirmPasswordField,
  label: "Confirm New Password",
  place: "Confirm Your New Password...",
};

export const fieldsNewPwd = [newPwdField, confirmNewPwd].map((el) => ({
  ...el,
  id: v4(),
}));

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
export const swapFieldsByAreaAuth = [
  fieldsAuth__0.map((el) => ({ field: el.field })),
  [...fieldsAuth__1.map((el) => ({ field: el.field })), { field: "terms" }],
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

const registerSwitch = {
  ...register,
  msg: "Don't have an' account ?",
  msgBold: "Register",
};
const loginSwitch = {
  ...login,
  msg: "Already have an' account ?",
  msgBold: "Login",
};
const verifySwitch = {
  ...verify,
  msg: "Email did not arrive ?",
  msgBold: "Send new email",
};
const forgotSwitch = {
  ...forgot,
  msg: "Forgot password ?",
  msgBold: "Recover",
};

export const fieldsRegisterSwitch: FieldSwitchFormType[] = [
  loginSwitch,
  verifySwitch,
].map((el) => ({
  ...el,

  id: v4(),
}));

export const fieldLoginSwitch: FieldSwitchFormType[] = [
  registerSwitch,
  forgotSwitch,
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldsSwitchForgot = [registerSwitch, verifySwitch].map((el) => ({
  ...el,
  id: v4(),
}));
export const fieldsSwitchVerify = [registerSwitch, forgotSwitch].map((el) => ({
  ...el,
  id: v4(),
}));
