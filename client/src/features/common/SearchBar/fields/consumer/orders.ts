import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { FaDatabase } from "react-icons/fa";
import { TbPigMoney, TbTruckDelivery } from "react-icons/tb";
import { v4 } from "uuid";
import { addSortFields, priceFilters, qtyFilters } from "../general/general";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { OrderStage } from "@/types/all/orders";
import { capt } from "@/core/lib/lib";
import { LuAlarmClock } from "react-icons/lu";

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

const filtersStageConsumer = {
  label: "Stage",
  field: "stage",
  icon: TbTruckDelivery,
  fields: Object.values(OrderStage).map((el) => ({
    label: capt(el.split("_").join(" ")),
    val: el,
  })),
};

export const filtersOrdersConsumer: FilterSearch[] = addNestedIDs([
  filtersStageConsumer,
]) as FilterSearch[];

export const numericFiltersOrdersConsumer: NumericFilterSearch[] = addNestedIDs(
  [priceFilters, qtyFilters]
) as NumericFilterSearch[];

export const sortersOrdersConsumer = addSortFields([
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
