import { FaUserGear } from "react-icons/fa6";
import { verifyAccountField } from "./fieldsActionsAuth";
import { FaUserSecret } from "react-icons/fa";
import { capt } from "@/lib/lib";
import { SwapFieldType } from "@/types/types";

export const userLoggedFieldsDrop = [
  {
    label: "Profile",
    path: "/user/profile-settings",
    icon: FaUserGear,
  },
  verifyAccountField ?? {},
  {
    label: "Manage Account",
    path: "/user/manage-account",
    icon: FaUserSecret,
  },
];

export const namesFields = [
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
