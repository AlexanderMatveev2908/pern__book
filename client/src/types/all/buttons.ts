import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { IconType } from "react-icons/lib";

export enum BtnAct {
  DEL = "DELETE",
  DO = "DO_SOMETHING",
  INFO = "INFO",
  WARN = "WARN",
}

export type CartBtnType = {
  icon: IconType;
  keyAction: KEY_ACTION_CART;
  act: BtnAct;
};

export type BtnIconLinkType = {
  label?: string;
  icon?: IconType;
  path: string;
};
