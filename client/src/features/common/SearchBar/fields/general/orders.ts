import { capt } from "@/core/lib/lib";
import { StoreOrderStage } from "@/types/all/orders";
import { FilterSearch } from "@/types/types";
import { TbTruckDelivery } from "react-icons/tb";

export const filtersOrdersStage: Omit<FilterSearch, "id"> = {
  label: "Stage",
  field: "stage",
  icon: TbTruckDelivery,
  fields: Object.values(StoreOrderStage).map((el) => ({
    label: capt(el),
    val: el,
  })),
};
