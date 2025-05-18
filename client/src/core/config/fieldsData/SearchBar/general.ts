import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { FilterSearch } from "@/types/types";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegStar, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
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
