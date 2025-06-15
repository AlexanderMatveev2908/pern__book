import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { OrderStoreType, StoreOrderStage } from "@/types/all/orders";
import { useMemo, useRef, useState, type FC } from "react";
import KanBanItem from "./components/KanBanItem";
import Draggable from "./components/Draggable";
import { rawTruckSVG } from "@/core/config/assets/rawSvgs/truck";

type PropsType = {
  os: OrderStoreType;
};

const KanBanOrderStage: FC<PropsType> = ({ os }) => {
  const [stage, setStage] = useState("paid");
  const [isDragging, setIsDragging] = useState(false);
  const [isDropping, setIsDropping] = useState<StoreOrderStage | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const argStages = useMemo(() => Object.values(StoreOrderStage), []);

  const ids = useCreateIds({
    lengths: [argStages.length],
  });

  const currIndex = useMemo(
    () => argStages.indexOf(stage as StoreOrderStage),
    [stage, argStages]
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;

    setIsDragging(true);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  const handleDragEnter = (st: StoreOrderStage) => {
    setIsDropping(st);
  };
  const handleDragLeave = () => {
    setIsDropping(null);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isDropping) setStage(isDropping);
    setIsDropping(null);
  };

  return (
    <div className="w-full grid grid-cols-3 gap-x-10 gap-y-5 items-center">
      {argStages.map((st, i) => (
        <KanBanItem
          key={ids[0][i]}
          {...{
            st,
            isIn: os.stage === st,
            handleDragEnter: () => handleDragEnter(st),
            handleDragLeave,
            isDropping,
            handleDrop,
            currIndex,
            innerIndex: i,
            Draggable:
              i === currIndex
                ? () => (
                    <Draggable
                      {...{
                        handleDragStart,
                        handleDragEnd,
                        isDragging,
                        dragRef,
                      }}
                    />
                  )
                : null,
          }}
        />
      ))}
    </div>
  );
};

export default KanBanOrderStage;
