import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { v4 } from "uuid";
import {
  addSortFields,
  avgPriceFilter,
  avgQtyFilter,
  commonFieldsTxtInputsStore,
  commonSortersStore,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
  populateIdsSearchbarFields,
} from "../general";
import { FaUsers } from "react-icons/fa";

export const fieldsSearchStore: FormFieldBasic[] = [
  ...commonFieldsTxtInputsStore,
  {
    field: "ID",
    label: "ID",
  },
].map((el) => ({
  ...el,
  place: `${el.label} Store...`,
  id: v4(),
}));

export const storeFilters: FilterSearch[] = [
  filtersCat,
  filtersOrders,
  filtersDelivery,
  filtersRating,
].map((el) => ({
  ...el,
  id: v4(),
  fields: el.fields.map((el) => ({
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

export const numericFiltersStore = populateIdsSearchbarFields([
  avgPriceFilter,
  avgQtyFilter,
  noOfWorkers,
]) as NumericFilterSearch[];

export const sorterStore: SorterSearch[] = commonSortersStore.map((el) => ({
  ...el,
  id: v4(),
  fields: addSortFields(),
}));
