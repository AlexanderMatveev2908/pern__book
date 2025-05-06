import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { OrderStage } from "@/types/all/orders";
import { FilterSearch } from "@/types/types";
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
