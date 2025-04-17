import { FC, useState } from "react";
import {
  fieldAccountNonLogged,
  sideFieldsNonLogged,
} from "../../../config/fields/fields.ts";
import SideLink from "./SideLink";
import { DropHandler } from "@/components/components.ts";

type PropsType = {
  handleSideClick: () => void;
};

const NonLoggedDrop: FC<PropsType> = ({ handleSideClick }) => {
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);

  return (
    <div className="w-full grid gap-5">
      <DropHandler
        {...{ isDropOpen, setIsDropOpen, el: fieldAccountNonLogged }}
      />
      <div
        className={`w-full grid el__flow ${
          isDropOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } `}
      >
        <div
          className={`grid gap-5 el__flow ${
            isDropOpen ? "" : "-translate-y-[50px]"
          }`}
        >
          {sideFieldsNonLogged.map((el) => (
            <SideLink key={el.id} {...{ el, handleSideClick }} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default NonLoggedDrop;
