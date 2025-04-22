import { Eraser } from "lucide-react";
import { IconType } from "react-icons/lib";

export type BtnFieldIconType = {
  id?: string;
  label: string;
  icon: IconType;
};

export const clearBtnField = {
  label: "Clear",
  icon: Eraser,
};
