import { AiFillInteraction } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

export const manageDropLabelGeneral = {
  icon: AiFillInteraction,
  label: "Manage",
};

export const workFlowLabel = {
  label: "Work flow",
  icon: MdUpdate,
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
