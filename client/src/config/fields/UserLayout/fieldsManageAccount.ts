import { v4 } from "uuid";

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
