import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import { FC } from "react";
import { FaDatabase } from "react-icons/fa";

type PropsType = {
  ID: string;
};

const ItemID: FC<PropsType> = ({ ID }) => {
  return (
    <div className="w-full bg-[#000] rounded-xl">
      <div className="w-full h-fit flex justify-start gap-6 items-center relative max-w-fit">
        <div className="w-fit flex justify-start items-center">
          <FaDatabase className="icon__md" />
        </div>

        <TooltipCpy {...{ txt: ID, bd: false }} />
      </div>
    </div>
  );
};

export default ItemID;
