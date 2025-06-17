import { REG_ID } from "@/core/config/regex";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { ordersWorkerSliceAPI } from "../../ordersWorkerSliceAPI";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import WrapApp from "@/components/HOC/WrapApp";
import { isObjOk } from "@/core/lib/lib";
import BreadCrumb from "@/components/elements/BreadCrumb";
import OrderStorePage from "@/components/elements/cards/orders/OrderStorePage/OrderStorePage";
import KanBanOrderStage from "@/components/elements/KanBanOrderStage/KanBanOrderStage";
import { AllowedPatchOrderStages, OrderStoreType } from "@/types/all/orders";
import { UserRole } from "@/types/types";

const OrderPageWorker: FC = () => {
  const { orderID } = useParams() ?? {};
  const isValidID = REG_ID.test(orderID ?? "");

  const res = ordersWorkerSliceAPI.useGetWorkerOrderQuery(
    { orderID: orderID as string },
    {
      skip: !isValidID,
    }
  );

  useWrapQueryAPI({ ...res });

  const { data: { order } = {} } = res ?? [];
  const [{ bookStoreUser: { role } = {} } = {}] = order?.store?.team ?? [];

  const [mutate] = ordersWorkerSliceAPI.usePatchOrderWorkerMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handlePatch = async (stage: AllowedPatchOrderStages) => {
    const res = wrapMutationAPI({
      cbAPI: () =>
        mutate({
          orderID: order?.id as string,
          stage,
        }),
    });

    if (!res) return;
  };

  return (
    <WrapApp {...{ ...res, canStay: isValidID, isSuccess: isObjOk(order) }}>
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                {
                  label: role ?? "worker",
                  path: "#",
                },
                {
                  label: "Orders",
                  path: `/worker/orders/list/${order?.store?.id ?? "#"}`,
                },
                { label: order?.id ?? "order", path: "#" },
              ],
            }}
          />

          <div className="w-full grid grid-cols-1 gap-y-6 mt-10">
            <OrderStorePage
              {...{
                os: order as OrderStoreType,
                Kanban: () => (
                  <KanBanOrderStage
                    {...{ os: order!, role: role as UserRole, handlePatch }}
                  />
                ),
              }}
            />
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default OrderPageWorker;
