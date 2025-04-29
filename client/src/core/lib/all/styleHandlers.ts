import { SideFieldType } from "@/core/config/fieldsData/Sidebar/sidebar";

export const handleSideLinkStyle = ({
  path,
  el,
}: {
  path: string;
  el: SideFieldType;
}) => new RegExp(path).test(el.path);
