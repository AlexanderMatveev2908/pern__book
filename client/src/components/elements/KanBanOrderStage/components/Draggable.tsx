import { Truck } from "lucide-react";
import type { FC } from "react";

type PropsType = {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  dragRef: React.RefObject<HTMLDivElement | null>;
};

const Draggable: FC<PropsType> = ({
  handleDragStart,
  handleDragEnd,
  isDragging,
  dragRef,
}) => {
  return (
    <div
      ref={dragRef}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`${
        isDragging ? "opacity-30" : ""
      } absolute -top-1/2 -right-[10px] border-blue-600 border-[3px] z-60 min-w-[60px] min-h-[60px] rounded-xl bg-[#000] flex justify-center items-center`}
      draggable
    >
      <Truck className="icon__lg" />
    </div>
  );
};

export default Draggable;
