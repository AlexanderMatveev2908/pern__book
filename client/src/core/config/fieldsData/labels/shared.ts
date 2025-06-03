import { Eraser } from "lucide-react";
import { AiFillInteraction } from "react-icons/ai";
import { HiLibrary } from "react-icons/hi";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { MdOutlineCategory, MdUpdate } from "react-icons/md";
import { BsCartDash, BsCartPlus, BsCartX } from "react-icons/bs";
import { BtnAct } from "@/types/types";

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

export enum KEY_ACTION_CART {
  INC_QTY_CART = "INC_QTY_CART",
  DEC_QTY_CART = "DEC_QTY_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
}

export const labelAddCart = {
  icon: BsCartPlus,
  keyAction: KEY_ACTION_CART.INC_QTY_CART,
  act: BtnAct.DO,
};
export const labelDecQtyCart = {
  icon: BsCartDash,
  keyAction: KEY_ACTION_CART.DEC_QTY_CART,
  act: BtnAct.WARN,
};
export const labelRemoveFromCart = {
  icon: BsCartX,
  keyAction: KEY_ACTION_CART.REMOVE_FROM_CART,
  act: BtnAct.DEL,
};

export enum KEY_MAP_STORE {
  BOOKS = "BOOKS",
  ADD_BOOK = "ADD_BOOK",
  TEAM = "TEAM",
  REVIEWS = "REVIEWS",
  ORDERS = "ORDERS",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
