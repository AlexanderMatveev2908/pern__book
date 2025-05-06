import { SideFieldType } from "@/core/config/fieldsData/Sidebar/sidebar";

export const handleSideLinkStyle = ({
  path,
  el,
}: {
  path: string;
  el: SideFieldType;
}) => new RegExp(path).test(el.path);

export const getSizeSearchbarBtns = (label: boolean) =>
  label ? "max-w-[200px]" : "max-w-[75px]";
