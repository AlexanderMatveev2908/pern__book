import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { v4 } from "uuid";
import {
  addSortFields,
  commonFieldsTxtInputsStore,
  commonSortersStore,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
  populateIdsSearchbarFields,
} from "../general";
import { FaDatabase, FaUsers } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

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

export const avgPriceFilter: Omit<NumericFilterSearch, "id"> = {
  label: "Avg Price",
  field: "avgPrice",
  icon: TbPigMoney,
  fields: [
    {
      label: "Min avg price",
      field: "minAvgPrice",
    },
    {
      label: "Max avg price",
      field: "maxAvgPrice",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

export const avgQtyFilter: Omit<NumericFilterSearch, "id"> = {
  label: "Avg quantity",
  icon: FaDatabase,
  field: "avgQty",
  fields: [
    {
      field: "minAvgQty",
      label: "Min avg quantity",
    },
    {
      field: "maxAvgQty",
      label: "Max avg quantity",
    },
  ].map((el) => ({
    ...el,
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
