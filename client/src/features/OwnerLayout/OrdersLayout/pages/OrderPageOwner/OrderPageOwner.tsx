import type { FC } from "react";
import { ownerOrdersSliceAPI } from "../../ownerOrdersSliceAPI";
import { useParams } from "react-router-dom";
import { REG_ID } from "@/core/config/regex";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { isObjOk } from "@/core/lib/lib";
import OrderStorePage from "@/components/elements/cards/orders/OrderStorePage/OrderStorePage";
import { AllowedPatchOrderStages, OrderStoreType } from "@/types/all/orders";
import WrapApp from "@/components/HOC/WrapApp";
import KanBanOrderStage from "@/components/elements/KanBanOrderStage/KanBanOrderStage";
import { UserRole } from "@/types/types";

const OrderPageOwner: FC = () => {
  const orderID = useParams()?.orderID;
  const isValidID = REG_ID.test(orderID ?? "");

  const res = ownerOrdersSliceAPI.useGetOrderOwnerQuery(
    { orderID: orderID ?? "" },
    {
      skip: !isValidID,
    }
  );

  const { data: { order } = {} } = res ?? {};

  useWrapQueryAPI({ ...res });
  const [mutate] = ownerOrdersSliceAPI.usePatchOrderOwnerMutation();
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
                { label: "admin", path: "#" },
                { label: "Orders", path: "/owner/orders/list" },
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
                    {...{ role: UserRole.OWNER, os: order!, handlePatch }}
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

export default OrderPageOwner;
