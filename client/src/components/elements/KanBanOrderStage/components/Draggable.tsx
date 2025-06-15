import { useDraggable } from "@dnd-kit/core";
import type { FC } from "react";
import TruckDrag from "./TruckDrag";

type PropsType = {
  st: string;
};

const Draggable: FC<PropsType> = ({ st }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: st,
  });

  return (
    <TruckDrag
      {...{
        attributes,
        listeners,
        setNodeRef,
        customStyle: isDragging ? "opacity-50" : "opacity-100",
      }}
    />
  );
};

export default Draggable;
