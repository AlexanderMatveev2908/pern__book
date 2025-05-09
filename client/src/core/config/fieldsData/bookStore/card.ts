import { HiLibrary } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";

export const labelCardStore = (name: string) => ({
  label: name,
  icon: HiLibrary,
});

export const statsCardStore = {
  label: "Info",
  icon: IoIosStats,
};
