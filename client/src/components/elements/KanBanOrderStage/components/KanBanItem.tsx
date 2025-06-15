import { capt } from "@/core/lib/lib";
import { StoreOrderStage } from "@/types/all/orders";
import { useDroppable } from "@dnd-kit/core";
import type { FC, ReactNode } from "react";

type PropsType = {
  st: StoreOrderStage;
  Draggable?: null | (() => ReactNode);
};

const KanBanItem: FC<PropsType> = ({ st, Draggable }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: st,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver ? "border-blue-600 border-dashed" : "border-neutral-800"
      } w-full flex justify-center items-center p-3 border-[3px] rounded-xl relative transition-all duration-300`}
    >
      <span className={` txt__3 pointer-events-none`}>{capt(st)}</span>

      {typeof Draggable === "function" && Draggable()}
    </div>
  );
};

export default KanBanItem;
