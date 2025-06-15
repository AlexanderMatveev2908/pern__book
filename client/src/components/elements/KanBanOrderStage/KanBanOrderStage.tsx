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
import SuccessInfo from "../SuccessInfo";
import { tailwindBreak } from "@/core/config/breakpoints";

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

  const handlePhoneClick = async (stage: AllowedPatchOrderStages) => {
    if (window.innerWidth > tailwindBreak.md) return;

    const oldIndex = argStages.indexOf(os.stage as KanBanStage);
    const newIndex = argStages.indexOf(stage as KanBanStage);

    if (newIndex < oldIndex) {
      handleAdminOnly();
      return;
    }

    await handlePatch(stage);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return os.stage === StoreOrderStage.COMPLETED ? (
    <SuccessInfo {...{ msg: "Order has been delivered and is completed" }} />
  ) : (
    <DndContext
      sensors={sensors}
      onDragEnd={async ({ active, over }) => {
        if (!over) return;

        const { oldI, newI } = getIndexes({ active, over });

        if (newI <= oldI) return;

        if (over.id === StoreOrderStage.COMPLETED && level < 1) {
          handleAdminOnly();
          return;
        }

        await handlePatch(over.id as AllowedPatchOrderStages);
      }}
    >
      <div
        className="w-full grid gap-x-10 gap-y-5 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {argStages.map((stage, i) => (
          <KanBanItem
            key={ids[0][i]}
            {...{
              stage,
              handlePhoneClick: () =>
                handlePhoneClick(stage as AllowedPatchOrderStages),
              canDrop: i > currIndex,
              isIn: i === currIndex,
              Draggable:
                i === currIndex ? () => <Draggable {...{ stage }} /> : null,
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
