import { FormFieldBasic, MySelectFieldType, UserRole } from "@/types/types";
import { v4 } from "uuid";
import { decapt } from "@/core/lib/lib";
import { addressFields_0, addressFields_1 } from "../shared/forms";

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
    label: "Company email *",
    place: "Company email...",
    type: "email",
  },
  {
    field: "phone",
    label: "Company phone *",
    place: "Company phone...",
  },
  {
    field: "website",
    label: "Website url",
    place: "Your website url...",
    type: "url",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldsStoreAddress_0: FormFieldBasic[] = [...addressFields_0].map(
  (el) => ({
    ...el,
    id: v4(),
    place: `Company ${el.label}...`,
  })
);

export const fieldsStoreAddress_1: FormFieldBasic[] = [...addressFields_1]
  .map((el) => ({
    ...el,
    id: v4(),
    place: `Company ${el.label}...`,
  }))
  .filter((el) => el.field !== "phone");

export const fieldsSwapStore: FormFieldBasic[][] = [
  fieldsStoreAddress_0,
  fieldsStoreAddress_1,
];

export const fieldsDelivery: FormFieldBasic[] = [
  {
    field: "deliveryPrice",
    label: "Delivery price",
    place: "Delivery price...",
    type: "text",
  },
  {
    field: "freeDeliveryAmount",
    label: "Amount for free delivery",
    place: "Price to reach for free delivery...",
    type: "text",
  },
  {
    field: "deliveryTime",
    label: "Delivery time (days) *",
    place: "Delivery time...",
    type: "text",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldEmailWorker = {
  field: "email",
  label: "Email",
  type: "email",
  place: "Worker email...",
};

export const fieldSelectWorkerRole: MySelectFieldType = {
  label: "User role",
  field: "role",
  options: [UserRole.EMPLOYEE, UserRole.MANAGER].map((el) => ({
    opt: el,
    label: decapt(el),
    id: v4(),
  })),
};

export const mandatoryKeysStore = [
  "name",
  "categories",
  "email",
  "phone",
  ...fieldsSwapStore.flatMap((arr) => arr.map((el) => el.field)),
  "deliveryTime",
];

export const optKeysStore = [
  "description",
  "website",
  "deliveryPrice",
  "freeDeliveryAmount",
  "video",
  "images",
];
