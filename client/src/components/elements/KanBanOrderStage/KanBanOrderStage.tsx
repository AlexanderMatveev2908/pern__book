import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { OrderStoreType, StoreOrderStage } from "@/types/all/orders";
import { useMemo, useState, type FC } from "react";
import KanBanItem from "./components/KanBanItem";
import Draggable from "./components/Draggable";
import {
  Active,
  DndContext,
  DragOverlay,
  Over,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TruckDrag from "./components/TruckDrag";

type PropsType = {
  os: OrderStoreType;
};

type KanBanStage = Exclude<StoreOrderStage, StoreOrderStage.REFUNDED>;

const KanBanOrderStage: FC<PropsType> = ({ os }) => {
  const [stage, setStage] = useState("paid");

  const argStages = useMemo(
    () =>
      Object.values(StoreOrderStage).filter(
        (st) => st !== StoreOrderStage.REFUNDED
      ),
    []
  );

  const ids = useCreateIds({
    lengths: [argStages.length],
  });

  const currIndex = useMemo(
    () => argStages.indexOf(stage as KanBanStage),
    [stage, argStages]
  );

  const getIndexes = ({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) => {
    const oldI = argStages.indexOf(active.id as unknown as KanBanStage);
    const newI = argStages.indexOf((over?.id as unknown as KanBanStage) ?? "");

    return {
      oldI,
      newI,
    };
  };

  return (
    <DndContext
      sensors={useSensors(useSensor(PointerSensor))}
      onDragEnd={({ active, over }) => {
        if (!over) return;

        const { oldI, newI } = getIndexes({ active, over });

        if (newI <= oldI) return;

        setStage(over.id as StoreOrderStage);
      }}
    >
      <div className="w-full grid grid-cols-3 gap-x-10 gap-y-5 items-center">
        {argStages.map((st, i) => (
          <KanBanItem
            key={ids[0][i]}
            {...{
              st,
              canDrop: i > currIndex,
              isIn: i === currIndex,
              Draggable:
                i === currIndex ? () => <Draggable {...{ st }} /> : null,
            }}
          />
        ))}
      </div>

      <DragOverlay>
        <TruckDrag {...{ customStyle: "opacity-100 scale-120" }} />
      </DragOverlay>
    </DndContext>
  );
};

export default KanBanOrderStage;
