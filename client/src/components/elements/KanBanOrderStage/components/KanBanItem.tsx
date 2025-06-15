import { capt } from "@/core/lib/lib";
import { StoreOrderStage } from "@/types/all/orders";
import { useDroppable } from "@dnd-kit/core";
import type { FC, ReactNode } from "react";

type PropsType = {
  stage: StoreOrderStage;
  Draggable?: null | (() => ReactNode);
  canDrop: boolean;
  isIn: boolean;
  handlePhoneClick?: () => void;
};

const KanBanItem: FC<PropsType> = ({
  stage,
  Draggable,
  canDrop,
  isIn,
  handlePhoneClick,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => handlePhoneClick?.()}
      className={`${
        isIn
          ? "scale-90 border-gray-600"
          : isOver && canDrop
          ? "border-blue-600 border-dashed"
          : "border-neutral-800"
      } hover:bg-blue-600 hover:cursor-pointer md:hover:cursor-default md:hover:bg-transparent w-full flex justify-center items-center p-3 border-[3px] rounded-xl relative transition-all duration-300`}
    >
      <span className={` txt__3 pointer-events-none`}>{capt(stage)}</span>

      {typeof Draggable === "function" && Draggable()}
    </div>
  );
};

export default KanBanItem;
