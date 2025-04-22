import { v4 } from "uuid";
import {
  addressFields_0,
  addressFields_1,
  namesFields,
} from "../general/userFields";
import { FormFieldBasic } from "@/types/types";
import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const fieldsProfileHeader: FormFieldBasic[] = !namesFields?.length
  ? []
  : [...namesFields].map((el) => ({
      ...el,
      id: v4(),
    }));

export const keysHeaderProfile = fieldsProfileHeader
  .map((el) => el.field)
  .concat("thumb");

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

export const BtnFieldIconType = [
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
