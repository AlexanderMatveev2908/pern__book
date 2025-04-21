import { v4 } from "uuid";
import {
  addressFields_0,
  addressFields_1,
  namesFields,
} from "../general/userFields";
import { FormFieldBasic } from "@/types/types";
import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons/lib";

export const fieldsProfileHeader: FormFieldBasic[] = [...namesFields].map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

export const fieldsProfileAddress_0: FormFieldBasic[] = [
  ...addressFields_0,
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldsProfileAddress_1: FormFieldBasic[] = [
  ...addressFields_1,
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldsProfileBody = [
  {
    field: "street",
  },
  {
    field: "zipCode",
    label: "Zip Code",
  },
  {
    field: "phone",
  },
];

export type FieldHeaderFooter = {
  id?: string;
  label: string;
  icon: IconType;
};

export const FieldHeaderFooter = [
  {
    label: "Change Password",
    icon: FaUserSecret,
  },
  {
    label: "Change Email",
    icon: MdEmail,
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
