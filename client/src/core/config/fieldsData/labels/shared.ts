import { Eraser } from "lucide-react";
import { AiFillInteraction } from "react-icons/ai";
import { HiLibrary } from "react-icons/hi";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { MdOutlineCategory, MdUpdate } from "react-icons/md";

export const manageDropLabelGeneral = {
  icon: AiFillInteraction,
  label: "Manage",
};

export const workFlowLabel = {
  label: "Work flow",
  icon: MdUpdate,
};

export const clearBtnField = {
  label: "Clear",
  icon: Eraser,
};

export const labelStore = {
  label: "Bookstore",
  icon: HiMiniBuildingLibrary,
};

export const labelInfo = {
  label: "Info",
  icon: IoIosStats,
};

export const labelCategories = {
  label: "Categories",
  icon: MdOutlineCategory,
};

export const libraryLabelStoreDynamic = (label: string) => ({
  label,
  icon: HiLibrary,
});

export enum KEY_MAP_STORE {
  BOOKS = "BOOKS",
  ADD_BOOK = "ADD_BOOK",
  TEAM = "TEAM",
  REVIEWS = "REVIEWS",
  ORDERS = "ORDERS",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
