import { capt, formatValDel, priceFormatter } from "@/core/lib/lib";
import { BookStoreType } from "@/types/all/bookStore";
import { OrderStage } from "@/types/all/orders";
import { FaMapMarkerAlt, FaWarehouse } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { v4 } from "uuid";
import { genValsRating } from "../../OwnerLayout/general";
import { MdConnectWithoutContact, MdOutlineCategory } from "react-icons/md";
import { CiTextAlignJustify } from "react-icons/ci";
import { HiLibrary } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";

export const statsBooks = (bookStore?: BookStoreType) =>
  [
    {
      label: "Total books",
      val: bookStore?.booksCount,
    },
    {
      label: "Avg price",
      val: priceFormatter(bookStore?.avgPrice ?? "0"),
    },
    {
      label: "Avg quantity",
      val: bookStore?.avgQty,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));

export const statsReviews = (bookStore?: BookStoreType) =>
  [...genValsRating(bookStore)].map((el) => ({
    ...el,
    id: v4(),
  }));

export const statsOrders = (store?: BookStoreType) =>
  [
    {
      label: "Total Orders",
      val: store?.ordersCount,
    },
    ...Object.values(OrderStage).map((el) => ({
      label: capt(el),
      val: store?.[`orders${capt(el)}Count` as keyof BookStoreType],
    })),
  ].map((el) => ({
    ...el,
    id: v4(),
  }));

export const labelTeamStore = {
  icon: RiTeamFill,
  label: "Team",
};

export const statsTeam = (store?: BookStoreType) =>
  [
    {
      label: "Total Employee",
      val: store?.teamCount,
    },
    {
      label: "Managers",
      val: store?.managersCount,
    },
    {
      label: "Employee",
      val: store?.employeesCount,
    },
  ].map((el) => ({
    ...el,
    id: v4(),
  }));

export const labelFieldAddressStore = {
  label: "Address",
  icon: FaMapMarkerAlt,
};

export const statsAddress = (bookStore?: BookStoreType) =>
  ["country", "state", "city", "street", "zipCode"].map((el) => ({
    label: capt(el),
    val: bookStore?.[el as keyof BookStoreType],
    id: v4(),
  }));

export const fieldsStatsContact = (bookStore?: BookStoreType) =>
  ["email", "phone", "website"].map((el) => {
    const val = bookStore?.[el as keyof BookStoreType];

    return {
      id: v4(),
      label: capt(el),
      val: val ?? "N/A",
    };
  });

export const labelDelivery = {
  label: "Delivery",
  icon: FaWarehouse,
};

export const statsDelivery = (bookStore?: BookStoreType) =>
  [
    { key: "deliveryTime", label: "Delivery Time" },
    { key: "deliveryPrice", label: "Delivery price" },
    { key: "freeDeliveryAmount", label: "Free delivery amount" },
  ].map((el) => {
    const val = bookStore?.[el.key as keyof BookStoreType];

    return {
      id: v4(),
      label: el.label,
      val: formatValDel(el.key, val),
    };
  });

export const categoriesStoreLabel = {
  label: "Categories",
  icon: MdOutlineCategory,
};

export const labelDescription = {
  label: "About store",
  icon: CiTextAlignJustify,
};

export const labelFieldContact = {
  label: "Contact",
  icon: MdConnectWithoutContact,
};

export const labelCardStore = (name: string) => ({
  label: name,
  icon: HiLibrary,
});

export const statsCardStore = {
  label: "Info",
  icon: IoIosStats,
};
