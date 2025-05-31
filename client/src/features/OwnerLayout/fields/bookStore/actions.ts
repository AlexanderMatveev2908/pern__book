import { RiBookShelfFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";
import { FaPenFancy, FaTrashAlt } from "react-icons/fa";
import { v4 } from "uuid";
import { IconType } from "react-icons/lib";
import { MdReviews } from "react-icons/md";
import { KEY_MAP_STORE } from "@/core/config/fieldsData/labels";

// * I USE MAP JUST FOR LEARNING POUPROSE, NORMALLY I WOULD JUST USE ARRAYS TO KEEP VALS

export type LabelStoreType = {
  icon: IconType;
  path: string;
  label: string;
};

export const labelsBookStore: Map<KEY_MAP_STORE, LabelStoreType> = new Map([
  [
    KEY_MAP_STORE.ADD_BOOK,
    { icon: FaPenFancy, path: "/owner/books/add-book", label: "Add Book" },
  ],
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
