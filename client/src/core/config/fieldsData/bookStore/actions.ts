import { RiBookShelfFill, RiTeamFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { v4 } from "uuid";

export const actionsBookStoreAdmin = [
  {
    label: "Books",
    icon: RiBookShelfFill,
    path: "/",
  },
  {
    label: "Team",
    icon: RiTeamFill,
    path: "/",
  },
  {
    label: "Orders",
    icon: TbTruckDelivery,
    path: "/",
  },
  {
    label: "Update",
    icon: GrUpdate,
    path: "/",
  },
  {
    label: "Delete",
    icon: FaTrashAlt,
    path: "/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
