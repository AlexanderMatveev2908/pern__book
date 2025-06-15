import { capt, formatD, priceFormatter } from "@/core/lib/lib";
import { OrderStoreType } from "@/types/all/orders";
import { Database, Truck } from "lucide-react";
import {
  FaDatabase,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { v4 } from "uuid";

export const fieldsOrderStore = (os: OrderStoreType) =>
  [
    {
      label: "Ordered At",
      icon: FaRegCalendarAlt,
      val: formatD(os!.order!.orderedAt!),
    },
    {
      label: "Expected Delivery",
      icon: FaRegCalendarCheck,
      val: formatD(os.expectedArrival),
    },
    {
      label: "Total amount",
      icon: TbPigMoney,
      val: priceFormatter(+os.amount + +os.delivery),
    },
    {
      label: "Delivery price",
      icon: Truck,
      val: priceFormatter(os.delivery, "Free Delivery"),
    },
    {
      label: "Total items",
      icon: FaDatabase,
      val: os.totItems + "",
    },
    {
      label: "Stage order",
      icon: Database,
      val: capt(os.stage),
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
