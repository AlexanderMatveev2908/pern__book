import { v4 } from "uuid";
import { FormFieldBasic } from "../../../types/generalFields";

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
].map((el) => ({
  ...el,
  id: v4(),
}));

export const emailField = {
  field: "email",
  label: "Email",
  type: "email",
};
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
  emailField,
  passwordField,
  confirmPasswordField,
].map((el) => ({
  ...el,
  id: v4(),
}));
