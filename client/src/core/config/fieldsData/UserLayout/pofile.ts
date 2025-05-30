import { v4 } from "uuid";
import { FormFieldBasic } from "@/types/types";
import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  addressFields_0,
  addressFields_1,
} from "../general/forms/shared/shared";

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

export const fieldsProfileHeader: FormFieldBasic[] = [...namesFields].map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

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

export const fieldsSwapProfile = [
  fieldsProfileAddress_0,
  fieldsProfileAddress_1,
];

export const allProfileKeys = [
  ...fieldsSwapProfile.flatMap((arr) => arr.map((el) => el.field)),
  ...namesFields.map((el) => el.field),
  "thumb",
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
