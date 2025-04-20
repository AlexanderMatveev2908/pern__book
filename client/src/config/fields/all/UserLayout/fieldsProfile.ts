import { v4 } from "uuid";
import { namesFields } from "../general/userFields";
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
