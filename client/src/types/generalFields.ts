import { IconType } from "react-icons/lib";

export type LabelDropType = {
  label: string;
  icon: IconType;
};

export type FormFieldBasic = {
  id: string;
  field: string;
  label: string;
  place?: string;
  type?: string;
};
