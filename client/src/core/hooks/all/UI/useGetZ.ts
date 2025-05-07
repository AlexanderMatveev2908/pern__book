import { getSIde } from "@/features/common/Header/headerSlice";
import { getPopup } from "@/features/common/Popup/popupSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useGetZ = () => {
  const isPopup = useSelector(getPopup).isPopup;
  const isSide = useSelector(getSIde).isSideOpen;

  const isSomethingOpen = useMemo(() => isPopup || isSide, [isPopup, isSide]);

  return isSomethingOpen ? "z__el_cover" : "z__el_ok";
};
