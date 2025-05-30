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
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { TbPigMoney } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";

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

const avgQtyFilter: Omit<NumericFilterSearch, "id"> = {
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

export const numericFiltersStoreWorker = populateIdsSearchbarFields([
  avgPriceFilter,
  avgQtyFilter,
]) as NumericFilterSearch[];

export const sorterStoreWorker: SorterSearch[] = commonSortersStore.map(
  (el) => ({
    ...el,
    id: v4(),
    fields: addSortFields(),
  })
);
