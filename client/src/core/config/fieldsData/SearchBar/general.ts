/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { FilterSearch } from "@/types/types";
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
  fields: Object.values(OrderStage).map((el) => ({
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

export const addSortFields = () =>
  ["ASC", "DESC"].map((el) => ({
    val: el,
    label: el,
    id: v4(),
    icon: el === "ASC" ? FaSortAmountUp : FaSortAmountDown,
  }));

export const populateIdsSearchbarFields = <T>(arr: T[]): T[] =>
  arr.map((el) => ({
    ...el,
    id: v4(),
    fields: (el as any).fields.map((sub: any) => ({
      ...sub,
      id: v4(),
    })),
  }));

export const commonFieldsTxtInputsStore = [
  {
    field: "name",
    label: "Name",
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
  place: `Store ${el.field}...`,
}));

export const commonSortersStore = [
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
];
