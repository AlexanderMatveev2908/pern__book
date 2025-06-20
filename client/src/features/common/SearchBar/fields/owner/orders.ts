import { v4 } from "uuid";
import {
  addSortFields,
  filtersCat,
  filtersDelivery,
  priceFilters,
  qtyFilters,
} from "../general/general";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { FaDatabase } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { filtersOrdersStage } from "../general/orders";
import { LuAlarmClock } from "react-icons/lu";

export const fieldsInputOrdersOwner: FormFieldBasic[] = [
  {
    field: "ID",
    label: "order ID",
  },
  {
    field: "bookStoreID",
    label: "bookstore ID",
  },
  {
    field: "bookStoreName",
    label: "bookstore name",
  },
].map((el) => ({
  ...el,
  id: v4(),
  place: el.label + "...",
}));

export const filtersOrdersOwner: FilterSearch[] = addNestedIDs([
  filtersCat,
  filtersOrdersStage,
  filtersDelivery,
]) as FilterSearch[];

export const ownerNumericFiltersOrders: NumericFilterSearch[] = addNestedIDs([
  priceFilters,
  qtyFilters,
]) as NumericFilterSearch[];

export const ownerSortersOrders = addSortFields([
  {
    label: "Created at",
    field: "createdAtSort",
    icon: LuAlarmClock,
  },

  {
    label: "Total amount",
    field: "totAmountSort",
    icon: TbPigMoney,
  },
  {
    label: "Total quantity",
    field: "totItemsSort",
    icon: FaDatabase,
  },
]);
