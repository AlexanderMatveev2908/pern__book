import { FaLink } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { HiLibrary } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";
import { v4 } from "uuid";

export const labelCardStore = (name: string) => ({
  label: name,
  icon: HiLibrary,
});

export const statsCardStore = {
  label: "Info",
  icon: IoIosStats,
};

export const linksCardStore = [
  {
    icon: FaLink,
    label: "Store",
    path: "/owner/book-store/",
  },
  {
    icon: GrUpdate,
    label: "Update",
    path: "/owner/book-store/update/",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
