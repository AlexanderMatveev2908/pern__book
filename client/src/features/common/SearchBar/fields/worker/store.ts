import { v4 } from "uuid";
import {
  addSortFields,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  filtersRating,
} from "../general/general";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { TbPigMoney } from "react-icons/tb";
import {
  avgQtyFilter,
  commonFieldsTxtInputsStore,
  commonSortersStore,
} from "../general/bookstore";
import { addNestedIDs } from "@/core/lib/all/utils/ids";

export const fieldsSearchStoreWorker: FormFieldBasic[] =
  commonFieldsTxtInputsStore.map((el) => ({
    ...el,
    id: v4(),
  }));

export const storeFiltersWorker: FilterSearch[] = [
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

const avgPriceFilter: Omit<NumericFilterSearch, "id"> = {
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

export const numericFiltersStoreWorker = addNestedIDs([
  avgPriceFilter,
  avgQtyFilter,
]) as NumericFilterSearch[];

export const sorterStoreWorker: SorterSearch[] = addSortFields(
  commonSortersStore
) as SorterSearch[];
