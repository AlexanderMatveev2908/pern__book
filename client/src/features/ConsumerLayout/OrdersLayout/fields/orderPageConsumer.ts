import { getExpectedDeliveredDay } from "@/core/lib/all/utils/calc";
import { capt, formatD, priceFormatter } from "@/core/lib/lib";
import { OrderStoreType, OrderType } from "@/types/all/orders";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";
import { TbDatabaseCog, TbPigMoney, TbTruckDelivery } from "react-icons/tb";
import { v4 } from "uuid";

export const fieldsHeaderOrder = (o: OrderType) =>
  [
    {
      icon: LuCalendarDays,
      label: "Ordered At",
      val: formatD(+o!.orderedAt!),
    },
    {
      icon: TbPigMoney,
      label: "Total amount",
      val: priceFormatter(+o!.amount - +o!.discount),
    },
    {
      icon: FaDatabase,
      label: "Total items",
      val: o.totItems + "",
    },
    {
      icon: TbDatabaseCog,
      label: "Status",
      val: capt(o.stage),
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));

export const fieldsBodyOrderStore = (os: OrderStoreType) =>
  [
    {
      icon: HiMiniBuildingLibrary,
      label: "Seller",
      val: os?.store?.name ?? "N/A",
    },
    {
      icon: TbDatabaseCog,
      label: "Status",
      val: capt(os.stage),
    },
    {
      icon: TbPigMoney,
      label: "Total amount",
      val: priceFormatter(+os.amount + +os.delivery),
    },
    {
      icon: FaDatabase,
      label: "Total items",
      val: os.totItems + "",
    },
    {
      icon: TbTruckDelivery,
      label: "Expected Delivery",
      val: getExpectedDeliveredDay({ daysToAdd: os?.store?.deliveryTime ?? 0 }),
    },
    {
      icon: CiDeliveryTruck,
      label: "Delivery price",
      val: priceFormatter(+os.delivery, "Free delivery"),
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));
