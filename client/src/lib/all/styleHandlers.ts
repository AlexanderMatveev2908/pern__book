import { SideFieldType } from "@/config/fields/Sidebar/sidebarFields";

export const handleSideLinkStyle = ({
  path,
  el,
}: {
  path: string;
  el: SideFieldType;
}) => new RegExp(path).test(el.path);
