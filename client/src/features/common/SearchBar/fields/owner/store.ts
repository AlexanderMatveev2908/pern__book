import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { v4 } from "uuid";
import {
  addSortFields,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
} from "../general/general";
import { FaUsers } from "react-icons/fa";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import {
  avgPriceFilter,
  avgQtyFilter,
  commonFieldsTxtInputsStore,
  commonSortersStore,
} from "../general/bookstore";

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

export const storeFilters: FilterSearch[] = addNestedIDs([
  filtersCat,
  filtersOrders,
  filtersDelivery,
  filtersRating,
]) as FilterSearch[];

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

export const numericFiltersStore = addNestedIDs([
  avgPriceFilter,
  avgQtyFilter,
  noOfWorkers,
]) as NumericFilterSearch[];

export const sorterStore: SorterSearch[] = addSortFields(
  commonSortersStore
) as SorterSearch[];
