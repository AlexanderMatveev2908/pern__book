import {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { Truck } from "lucide-react";
import type { FC } from "react";

type PropsType = {
  attributes?: DraggableAttributes;
  listeners?: DraggableSyntheticListeners;
  setNodeRef?: (element: HTMLElement | null) => void;
  customStyle: string;
};

const TruckDrag: FC<PropsType> = ({
  attributes,
  listeners,
  setNodeRef,
  customStyle,
}) => {
  return (
    <div
      ref={typeof setNodeRef === "function" ? setNodeRef : undefined}
      {...(listeners ?? {})}
      {...(attributes ?? {})}
      className={`${
        customStyle ?? ""
      } absolute -top-1/2 -right-[10px] border-blue-600 border-[3px] z-60 min-w-[60px] min-h-[60px] rounded-xl bg-[#000] flex justify-center items-center`}
    >
      <Truck className="icon__lg" />
    </div>
  );
};

export default TruckDrag;
