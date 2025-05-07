import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { v4 } from "uuid";
import {
  avgPriceFilter,
  avgQtyFilter,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
} from "./general";
import { FaUsers } from "react-icons/fa";

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

export const storeFilters: FilterSearch[] = [
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
}));

const noOfWorkers = {
  label: "Workers",
  field: "workers",
  icon: FaUsers,
  fields: [
    {
      field: "workers",
      label: "No of workers",
    },
    {
      field: "managers",
      label: "No of Managers",
    },
    {
      field: "employees",
      label: "No of Employees",
    },
  ].map((el) => ({
    ...el,
    id: v4(),
    place: el.label + "...",
  })),
};

export const numericFiltersStore: NumericFilterSearch[] = [
  avgPriceFilter,
  avgQtyFilter,
  noOfWorkers,
].map((el) => ({
  ...el,
  id: v4(),
  fields: el.fields?.map((el) => ({
    ...el,
    id: v4(),
  })),
}));
