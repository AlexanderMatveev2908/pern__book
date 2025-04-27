import { FormFieldBasic } from "@/types/types";
import { v4 } from "uuid";
import { addressFields_0, addressFields_1 } from "../UserLayout/fieldsProfile";

export const fieldNameStore: FormFieldBasic = {
  field: "name",
  place: "Your Bookstore name...",
};
export const fieldDescStore: FormFieldBasic = {
  field: "description",
  place: "About your Bookstore...",
};

export const fieldsContact: FormFieldBasic[] = [
  {
    field: "email",
    label: "Company email",
    place: "Company email...",
    type: "email",
  },
  {
    field: "phone",
    label: "Company phone",
    place: "Company phone...",
  },
  {
    field: "website",
    label: "Website url ~",
    place: "Your website url...",
    type: "url",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldsSwapAddressStore = [
  addressFields_0,
  addressFields_1.filter((el) => el.field !== "phone"),
];
