import { FilterSearch, FormFieldBasic } from "@/types/types";
import { v4 } from "uuid";
import { filtersCat, filtersDelivery, filtersOrders } from "./general";

export const fieldsSearchStore: FormFieldBasic[] = [
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

export const storeFilters = [filtersCat, filtersOrders, filtersDelivery].map(
  (el) => ({
    ...el,
    id: v4(),
  })
) as FilterSearch[];
