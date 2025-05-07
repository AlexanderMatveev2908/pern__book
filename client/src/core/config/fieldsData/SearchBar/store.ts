import { FilterSearch, FormFieldBasic } from "@/types/types";
import { v4 } from "uuid";
import {
  avgPriceFilter,
  avgQtyFilter,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
} from "./general";

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

export const storeFilters = [
  filtersCat,
  filtersOrders,
  filtersDelivery,
  filtersRating,
].map((el) => ({
  ...el,
  id: v4(),
  fields: el.fields?.map((el) => ({
    ...el,
    id: v4(),
  })),
})) as FilterSearch[];

export const numericFiltersStore = [avgPriceFilter, avgQtyFilter].map((el) => ({
  ...el,
  id: v4(),
  fields: el.fields?.map((el) => ({
    ...el,
    id: v4(),
  })),
}));
