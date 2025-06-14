import { getExpectedDeliveredDay } from "@/core/lib/all/utils/calc";
import { formatD, priceFormatter } from "@/core/lib/lib";
import { OrderStoreType } from "@/types/all/orders";
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
      val: getExpectedDeliveredDay({
        dayFrom: os.order!.orderedAt!,
        daysToAdd: os!.store!.deliveryTime ?? 0,
      }),
    },
    {
      label: "Total amount",
      icon: TbPigMoney,
      val: priceFormatter(+os.amount + +os.delivery),
    },
    {
      label: "Total items",
      icon: FaDatabase,
      val: os.totItems + "",
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
