import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { FaDatabase } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { v4 } from "uuid";
import {
  addSortFields,
  createdUpdateAtFields,
  filtersDelivery,
  priceFilters,
  qtyFilters,
} from "../general/general";
import { filtersOrdersStage } from "../general/orders";
import { addNestedIDs } from "@/core/lib/all/utils/ids";

export const fieldsInputOrdersConsumer: FormFieldBasic[] = [
  {
    field: "ID",
    label: "order ID",
  },
].map((el) => ({
  ...el,
  id: v4(),
  place: el.label + "...",
}));

export const filtersOrdersConsumer: FilterSearch[] = addNestedIDs([
  filtersOrdersStage,
  filtersDelivery,
]) as FilterSearch[];

export const numericFiltersOrdersConsumer: NumericFilterSearch[] = addNestedIDs(
  [priceFilters, qtyFilters]
) as NumericFilterSearch[];

export const sortersOrdersConsumer = addSortFields([
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
