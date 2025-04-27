import { FormFieldBasic } from "@/types/types";
import { v4 } from "uuid";

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
