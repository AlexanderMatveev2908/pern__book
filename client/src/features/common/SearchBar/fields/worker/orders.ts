import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { v4 } from "uuid";
import { filtersOrdersStage } from "../general/orders";
import {
  addSortFields,
  createdUpdateAtFields,
  filtersDelivery,
  priceFilters,
  qtyFilters,
} from "../general/general";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { TbPigMoney } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";

export const fieldsInputOrdersWorker: FormFieldBasic[] = [
  {
    field: "ID",
    label: "order ID",
  },
].map((el) => ({
  ...el,
  id: v4(),
  place: el.label + "...",
}));

export const filtersOrdersWorker: FilterSearch[] = addNestedIDs([
  filtersOrdersStage,
  filtersDelivery,
]) as FilterSearch[];

export const numericFiltersOrdersWorker: NumericFilterSearch[] = addNestedIDs([
  priceFilters,
  qtyFilters,
]) as NumericFilterSearch[];

export const sortersOrdersWorker = addSortFields([
  ...createdUpdateAtFields,

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
