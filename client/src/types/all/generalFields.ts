/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons/lib";

export type LabelDropType = {
  label: string;
  icon: IconType;
};

export type LabelActionType = LabelDropType & {
  path: string;
  id: string;
};

export type FormFieldBasic = {
  id?: string;
  field: string;
  label?: string;
  place?: string;
  type?: string;
  customCB?: (val: any) => void;
};

export type PwdCheckerType = {
  reg: RegExp;
  icon: IconType;
  id?: string;
};

export type EmailFormType = {
  email: string;
};

export type BtnFieldIconType = {
  id?: string;
  label?: string | null;
  pendingLabel?: string;
  icon: IconType;
};

export type SelectOptType = {
  id: string;
  opt: string;
  label: string;
};

export type MySelectFieldType = {
  label: string;
  field: string;
  options: SelectOptType[];
};

export type FilterSubField = {
  id?: string;
  label: string;
  val: string;
};

export type FilterSearch = {
  id: string;
  field: string;
  label: string;
  icon: IconType;
  fields: FilterSubField[];
};

export type SorterSearch = Omit<FilterSearch, "fields"> & {
  fields: (FilterSubField & {
    icon: IconType;
  })[];
};

export type NumericFilterSearch = Omit<FilterSearch, "fields"> & {
  fields: FormFieldBasic[];
};
