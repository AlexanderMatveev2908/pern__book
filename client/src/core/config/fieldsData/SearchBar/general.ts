import { v4 } from "uuid";

export const fieldsSearchStore = [
  {
    field: "name",
    label: "Name",
  },
  {
    field: "ID",
    label: "ID",
  },
  {
    field: "country",
    label: "Country",
  },
  {
    field: "state",
    label: "State",
  },
  {
    field: "city",
    label: "City",
  },
].map((el) => ({
  ...el,
  id: v4(),
  place: `${el.label} Store...`,
}));
