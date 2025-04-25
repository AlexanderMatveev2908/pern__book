import { FC, useState } from "react";
import SideLink from "./SideLink.tsx";
import { DropHandler } from "@/components/components.ts";
import { useDispatch } from "react-redux";
import { SideFieldType } from "@/config/fields/Sidebar/sidebarFields.ts";
import { setIsSideOpen } from "../../Header/headerSlice.ts";
import { LabelDropType } from "@/types/types.ts";

type PropsType = {
  arr?: SideFieldType[];
  label: LabelDropType;
};

const SidebarDrop: FC<PropsType> = ({ arr, label }) => {
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const handleSideClick = () => dispatch(setIsSideOpen(false));

  return (
    <div className="w-full grid border-l-[3px] px-2 -ml-2 border-blue-600">
      <DropHandler {...{ isDropOpen, setIsDropOpen, el: label }} />
      <div
        className={`w-full grid el__flow ${
          isDropOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } `}
      >
        <div
          className={`grid gap-5 el__flow  ${
            isDropOpen ? "pt-5" : "-translate-y-[50px]"
          }`}
        >
          {!!arr?.length &&
            arr.map((el) => (
              <SideLink key={el.id} {...{ el, handleSideClick }} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default SidebarDrop;
