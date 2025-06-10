import { v4 } from "uuid";
import {
  addSortFields,
  createdUpdateAtFields,
  filtersCat,
  filtersDelivery,
  filtersOrders,
  priceFilters,
  qtyFilters,
} from "../general/general";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { FaRegStar } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

export const fieldsInputOrders: FormFieldBasic[] = [
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
  filtersOrders,
  filtersDelivery,
]) as FilterSearch[];

export const ownerNumericFiltersOrders: NumericFilterSearch[] = addNestedIDs([
  priceFilters,
  qtyFilters,
]) as NumericFilterSearch[];

export const ownerSortersOrders = addSortFields([
  {
    ...createdUpdateAtFields,
  },
  {
    label: "Avg rating",
    field: "ratingSort",
    icon: FaRegStar,
  },
  {
    label: "Price",
    field: "priceSort",
    icon: TbPigMoney,
  },
]);
