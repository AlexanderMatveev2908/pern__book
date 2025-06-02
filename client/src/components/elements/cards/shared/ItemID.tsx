import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import { FC } from "react";
import { FaDatabase } from "react-icons/fa";

type PropsType = {
  ID: string;
};

const ItemID: FC<PropsType> = ({ ID }) => {
  return (
    <div className="w-full max-w-full grid grid-cols-[50px_1fr] items-center">
      <div className="w-full flex justify-start items-center">
        <FaDatabase className="icon__md" />
      </div>

      <div className="w-full max-w-full h-full">
        <TooltipCpy {...{ txt: ID, bd: false }} />
      </div>
    </div>
  );
};

export default ItemID;
