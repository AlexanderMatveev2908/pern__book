import { useDraggable } from "@dnd-kit/core";
import type { FC } from "react";
import TruckDrag from "./TruckDrag";

type PropsType = {
  stage: string;
};

const Draggable: FC<PropsType> = ({ stage }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: stage,
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
