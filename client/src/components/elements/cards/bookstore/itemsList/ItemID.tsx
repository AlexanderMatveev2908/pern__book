import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import { FC } from "react";
import { FaDatabase } from "react-icons/fa";

type PropsType = {
  ID: string;
};

const ItemID: FC<PropsType> = ({ ID }) => {
  return (
    <div className="w-full grid grid-cols-[75px_1fr] items-center">
      <div className="w-full flex justify-start items-center">
        <FaDatabase className="icon__md" />
      </div>

      <div className="w-full flex">
        <TooltipCpy {...{ txt: ID }} />
      </div>
    </div>
  );
};

export default ItemID;
