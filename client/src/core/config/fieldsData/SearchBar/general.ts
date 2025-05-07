import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { FilterSearch, NumericFilterSearch } from "@/types/types";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaDatabase, FaRegStar } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { TbPigMoney, TbTruckDelivery } from "react-icons/tb";

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

export const avgPriceFilter: Omit<NumericFilterSearch, "id"> = {
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

export const avgQtyFilter: Omit<NumericFilterSearch, "id"> = {
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
