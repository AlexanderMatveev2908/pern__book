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
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
} from "./general";
import { FaDatabase, FaRegStar, FaUsers } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { LuAlarmClock } from "react-icons/lu";

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

export const sorterStore: SorterSearch[] = [
  {
    label: "Created at",
    field: "createdAtSort",
    icon: LuAlarmClock,
  },
  {
    label: "Updated at",
    field: "updatedAtSort",
    icon: LuAlarmClock,
  },
  {
    label: "Avg rating",
    field: "avgRatingSort",
    icon: FaRegStar,
  },
  {
    label: "Avg Price",
    field: "avgPriceSort",
    icon: TbPigMoney,
  },
  {
    label: "Avg Quantity",
    field: "avgQtySort",
    icon: FaDatabase,
  },
].map((el) => ({
  ...el,
  id: v4(),
  fields: addSortFields(),
}));
