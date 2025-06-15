import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import {
  AllowedPatchOrderStages,
  OrderStoreType,
  StoreOrderStage,
} from "@/types/all/orders";
import { useMemo, type FC } from "react";
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
import { useDispatch } from "react-redux";
import { openToast } from "@/features/common/Toast/toastSlice";
import { EventApp, UserRole } from "@/types/types";

type PropsType = {
  os: OrderStoreType;
  role: UserRole;
  handlePatch: (stage: AllowedPatchOrderStages) => void;
};

type KanBanStage = Exclude<StoreOrderStage, StoreOrderStage.REFUNDED>;

const KanBanOrderStage: FC<PropsType> = ({ os, role, handlePatch }) => {
  const level = useMemo(() => {
    const arg = [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER];
    const i = arg.indexOf(role);

    return i;
  }, [role]);

  const dispatch = useDispatch();
  const handleAdminOnly = () =>
    dispatch(
      openToast({
        msg: "Only owner and managers can mark orders as completed",
        statusCode: 403,
        type: EventApp.ERR,
      })
    );

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
    () => argStages.indexOf(os.stage as KanBanStage),
    [os, argStages]
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
      onDragEnd={async ({ active, over }) => {
        if (!over) return;

        const { oldI, newI } = getIndexes({ active, over });

        if (newI <= oldI) return;

        if (over.id === StoreOrderStage.COMPLETED && level < 2) {
          handleAdminOnly();
          return;
        }

        await handlePatch(over.id as AllowedPatchOrderStages);
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
