import { RiBookShelfFill, RiTeamFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";
import {
  FaMapMarkerAlt,
  FaPenFancy,
  FaTrashAlt,
  FaWarehouse,
} from "react-icons/fa";
import { v4 } from "uuid";
import { BookStoreType } from "@/types/all/bookStore";
import { IconType } from "react-icons/lib";
import {
  MdConnectWithoutContact,
  MdOutlineCategory,
  MdReviews,
} from "react-icons/md";
import { capt, formatValDel, priceFormatter } from "@/core/lib/lib";
import { CiTextAlignJustify } from "react-icons/ci";
import { OrderStage } from "@/types/all/orders";
import { genValsRating } from "../general";

// * I USE MAP JUST FOR LEARNING POUPROSE, NORMALLY I WOULD JUST USE ARRAYS TO KEEP VALS

export enum KEY_MAP_STORE {
  BOOKS = "BOOKS",
  ADD_BOOK = "ADD_BOOK",
  TEAM = "TEAM",
  REVIEWS = "REVIEWS",
  ORDERS = "ORDERS",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type LabelStoreType = {
  icon: IconType;
  path: string;
  label: string;
};

export const labelsBookStore: Map<KEY_MAP_STORE, LabelStoreType> = new Map([
  [KEY_MAP_STORE.ADD_BOOK, { icon: FaPenFancy, path: "/", label: "Add Book" }],
  [KEY_MAP_STORE.BOOKS, { icon: RiBookShelfFill, path: "/", label: "Books" }],
  [KEY_MAP_STORE.ORDERS, { icon: TbTruckDelivery, path: "/", label: "Orders" }],
  [KEY_MAP_STORE.REVIEWS, { icon: MdReviews, path: "/", label: "Reviews" }],
  [
    KEY_MAP_STORE.UPDATE,
    { icon: GrUpdate, path: "/owner/book-store/update/", label: "Update" },
  ],
  [KEY_MAP_STORE.DELETE, { icon: FaTrashAlt, path: "/", label: "Delete" }],
]);

export const actionsBookStoreAdmin = [...labelsBookStore.entries()].map(
  (el) => ({
    originalKey: el[0],
    label: el[1].label,
    icon: el[1].icon,
    path: el[1].path,
    id: v4(),
  })
);

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

export const labelFieldContact = {
  label: "Contact",
  icon: MdConnectWithoutContact,
};

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

// export const statsStore = (
//   valsBooks?: (number | string)[],
//   valsTeam?: TeamItem[],
//   valsOrders?: (number | string)[]
// ) =>
//   new Map([
//     [
//       KEY_MAP_STORE.BOOKS,
//       {
//         fields: [
//           {
//             label: "Total books",
//             val: valsBooks?.[0],
//           },
//         ].map((el) => ({
//           ...el,
//           id: v4(),
//         })),
//       },
//     ],
//     [
//       KEY_MAP_STORE.TEAM,
//       {
//         fields: [
//           {
//             label: "Total Employee",
//             val: valsTeam?.length + "",
//           },
//           {
//             label: "Managers",
//             val: valsTeam
//               ? valsTeam.filter((el) => el.role === UserRole.MANAGER).length
//               : 0,
//           },
//           {
//             label: "Employee",
//             val: valsTeam
//               ? valsTeam.filter((el) => el.role === UserRole.EMPLOYEE).length
//               : 0,
//           },
//         ].map((el) => ({
//           ...el,
//           id: v4(),
//         })),
//       },
//     ],
//     [
//       KEY_MAP_STORE.ORDERS,
//       {
//         fields: [
//           {
//             label: "Total Orders",
//             val: valsOrders?.[0],
//           },
//         ].map((el) => ({
//           ...el,
//           id: v4(),
//         })),
//       },
//     ],
//   ]);
