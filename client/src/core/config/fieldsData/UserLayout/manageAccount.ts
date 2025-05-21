import { v4 } from "uuid";
import { confirmNewPwd, newPwdField } from "../AuthLayout/auth";

export enum ActionsManageAccount {
  CHANGE_EMAIL = "change email",
  RESET_PASSWORD = "reset password",
  DELETE_ACCOUNT = "delete account",
}

export const titlesFormsManage = [...Object.values(ActionsManageAccount)].map(
  (el) => ({
    title: el,
    id: v4(),
  })
);

export const newEmailField = {
  field: "email",
  label: "New Email",
  type: "email",
  place: "Your new email...",
};

export const fieldsNewPwdReset = [newPwdField, confirmNewPwd].map((el) => ({
  ...el,
  id: v4(),
}));
