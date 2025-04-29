import { v4 } from "uuid";
import { FormFieldBasic, SwapFieldType } from "@/types/types";
import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { capt } from "@/core/lib/lib";

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

export const addressFields_0: SwapFieldType[] = [
  "country",
  "state",
  "city",
].map((el) => ({
  field: el,
  label: capt(el),
}));
export const addressFields_1 = [
  "street",
  { field: "zipCode", label: "Zip Code" },
  "phone",
].map((el) =>
  typeof el === "object"
    ? el
    : {
        field: el,
        label: capt(el),
      }
);

export const swapAddressByArea = [addressFields_0, addressFields_1];
export const swapAddressFieldsMerg = swapAddressByArea.flatMap((arr) =>
  arr.map((el) => el.field)
);
export const allProfileKeys = [
  ...swapAddressFieldsMerg,
  ...namesFields.map((el) => el.field),
  "thumb",
];

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
