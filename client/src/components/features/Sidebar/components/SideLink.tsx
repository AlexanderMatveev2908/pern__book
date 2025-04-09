import { FC } from "react";
import { SideFieldType } from "../../../../config/fields/Sidebar/sidebarFields";

type PropsType = {
  el: SideFieldType;
};

const SideLink: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-fit flex justify-start gap-5 group el__after_below items-center">
      <el.icon className="icon__with_txt icon__md" />
      <span className="txt__2 el__flow group-hover:text-blue-600 font-semibold">
        {el.label}
      </span>
    </div>
  );
};
export default SideLink;
