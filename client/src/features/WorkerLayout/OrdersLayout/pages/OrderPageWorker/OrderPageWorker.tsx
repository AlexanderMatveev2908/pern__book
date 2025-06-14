import { REG_ID } from "@/core/config/regex";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { ordersWorkerSliceAPI } from "../../ordersWorkerSliceAPI";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import WrapApp from "@/components/HOC/WrapApp";
import { isObjOk } from "@/core/lib/lib";
import BreadCrumb from "@/components/elements/BreadCrumb";

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

  return (
    <WrapApp {...{ ...res, canStay: isValidID, isSuccess: isObjOk(order) }}>
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                {
                  label:
                    order!.store!.team?.[0]?.bookStoreUser?.role ?? "worker",
                  path: "#",
                },
                { label: "Orders", path: "/consumer/orders/list" },
                { label: order?.id ?? "order", path: "#" },
              ],
            }}
          />
        </>
      )}
    </WrapApp>
  );
};

export default OrderPageWorker;
