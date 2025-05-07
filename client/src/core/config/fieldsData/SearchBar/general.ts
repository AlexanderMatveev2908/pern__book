import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { FilterSearch } from "@/types/types";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { TbPigMoney, TbTruckDelivery } from "react-icons/tb";

export const filtersCat: Partial<FilterSearch> = {
  label: "Categories",
  field: "categories",
  icon: MdOutlineCategory,
  fields: Object.values(CatBookStore).map((el) => ({
    field: el,
    label: capt(el),
  })),
};

export const filtersOrders: Partial<FilterSearch> = {
  label: "Orders",
  field: "orders",
  icon: TbTruckDelivery,
  fields: Object.values(OrderStage).map((el) => ({
    label: capt(el),
    field: el,
  })),
};

export const filtersDelivery: Partial<FilterSearch> = {
  label: "Delivery",
  field: "delivery",
  icon: CiDeliveryTruck,
  fields: Object.values(DeliveryType).map((el) => ({
    label: capt(el.split("_").join(" ")),
    field: el,
  })),
};

export const ratingRanges = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"];

export const filtersRating: Partial<FilterSearch> = {
  label: "Avg rating",
  field: "avgRating",
  icon: FaRegStar,
  fields: ratingRanges.map((el) => ({
    field: el,
    label: el,
  })),
};

export const avgPriceFilter: Partial<FilterSearch> = {
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

export const avgQtyFilter: Partial<FilterSearch> = {
  label: "Avg quantity",
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
