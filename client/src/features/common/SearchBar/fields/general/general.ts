import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, StoreOrderStage } from "@/types/all/orders";
import { FilterSearch, NumericFilterSearch } from "@/types/types";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaDatabase,
  FaRegStar,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { TbPigMoney, TbTruckDelivery } from "react-icons/tb";
import { v4 } from "uuid";

export const filtersCat: Omit<FilterSearch, "id"> = {
  label: "Categories",
  field: "categories",
  icon: MdOutlineCategory,
  fields: Object.values(CatBookStore).map((el) => ({
    val: el,
    label: capt(el),
  })),
};

export const filtersOrders: Omit<FilterSearch, "id"> = {
  label: "Orders",
  field: "orders",
  icon: TbTruckDelivery,
  fields: Object.values(StoreOrderStage).map((el) => ({
    label: capt(el),
    val: el,
  })),
};

export const filtersDelivery: Omit<FilterSearch, "id"> = {
  label: "Delivery",
  field: "delivery",
  icon: CiDeliveryTruck,
  fields: Object.values(DeliveryType).map((el) => ({
    label: capt(el.split("_").join(" ")),
    val: el,
  })),
};

export const priceFilters: Omit<NumericFilterSearch, "id"> = {
  label: "Price",
  field: "price",
  icon: TbPigMoney,
  fields: [
    {
      label: "Min price",
      field: "minPrice",
    },
    {
      label: "Max price",
      field: "maxPrice",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

export const qtyFilters: Omit<NumericFilterSearch, "id"> = {
  label: "Quantity",
  icon: FaDatabase,
  field: "qty",
  fields: [
    {
      field: "minQty",
      label: "Min quantity",
    },
    {
      field: "maxQty",
      label: "Max quantity",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

export const ratingRanges = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"];

export const filtersRating: Omit<FilterSearch, "id"> = {
  label: "Avg rating",
  field: "avgRating",
  icon: FaRegStar,
  fields: ratingRanges.map((el) => ({
    val: el,
    label: el,
  })),
};

export const addSortFields = <T>(arr: T[]): T[] =>
  arr.map((el) => ({
    ...el,
    id: v4(),
    fields: ["ASC", "DESC"].map((el) => ({
      val: el,
      label: el,
      id: v4(),
      icon: el === "ASC" ? FaSortAmountUp : FaSortAmountDown,
    })),
  }));

export const createdUpdateAtFields = [
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
];
