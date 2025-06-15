import { capt } from "@/core/lib/lib";
import { StoreOrderStage } from "@/types/all/orders";
import type { FC, ReactNode } from "react";

type PropsType = {
  st: StoreOrderStage;
  Draggable?: null | (() => ReactNode);
  handleDragEnter: () => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  isDropping?: StoreOrderStage | null;
  currIndex: number;
  innerIndex: number;
};

const KanBanItem: FC<PropsType> = ({
  st,
  Draggable,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  isDropping,
  currIndex,
  innerIndex,
}) => {
  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`w-full flex justify-center items-center p-3 border-[3px] rounded-xl relative transition-all duration-300 ${
        isDropping === st && innerIndex > currIndex
          ? "border-blue-600 scale-110 border-dashed"
          : "border-neutral-800"
      }`}
    >
      <span className={` txt__3 pointer-events-none`}>{capt(st)}</span>

      {typeof Draggable === "function" && Draggable()}
    </div>
  );
};

export default KanBanItem;
