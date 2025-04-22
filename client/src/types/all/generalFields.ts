import { IconType } from "react-icons/lib";

export type LabelDropType = {
  label: string;
  icon: IconType;
};

export type FormFieldBasic = {
  id?: string;
  field: string;
  label?: string;
  place?: string;
  type?: string;
};

export type PwdCheckerType = {
  reg: RegExp;
  icon: IconType;
  id?: string;
};

export type EmailFormType = {
  email: string;
};

export type SwapFieldType = {
  field: string;
  label?: string;
};
