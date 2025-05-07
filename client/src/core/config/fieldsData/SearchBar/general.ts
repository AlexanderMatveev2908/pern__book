import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { DeliveryType, OrderStage } from "@/types/all/orders";
import { FilterSearch } from "@/types/types";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { v4 } from "uuid";

export const filtersCat: Partial<FilterSearch> = {
  label: "Categories",
  field: "categories",
  icon: MdOutlineCategory,
  fields: Object.values(CatBookStore).map((el) => ({
    field: el,
    label: capt(el),
    id: v4(),
  })),
};

export const filtersOrders: Partial<FilterSearch> = {
  label: "Orders",
  field: "orders",
  icon: TbTruckDelivery,
  fields: Object.values(OrderStage).map((el) => ({
    id: v4(),
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
    id: v4(),
    field: el,
  })),
};
