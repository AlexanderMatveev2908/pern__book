import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import { ordersConsumerSliceAPI } from "../../ordersConsumerSliceAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import BreadCrumb from "@/components/elements/BreadCrumb";
import HeaderOrderPage from "./components/HeaderOrderPage";
import { OrderType } from "@/types/all/orders";
import BodyOrderConsumer from "./components/BodyOrderConsumer/BodyOrderConsumer";
import SpanAddressOrder from "../../../../../components/elements/cards/orders/SpanAddressOrder";
import WrapApp from "@/components/HOC/WrapApp";

const OrderPageConsumer: FC = () => {
  const { user } = useGetU();
  const orderID = useParams()?.orderID;
  const isValidID = REG_ID.test(orderID ?? "");
  const canStay = useMemo(
    () => user?.hasConsumerOrders && isValidID,
    [user, isValidID]
  );

  const res = ordersConsumerSliceAPI.useGetOrderConsumerQuery(
    {
      orderID: orderID!,
    },
    { skip: !isValidID, refetchOnMountOrArgChange: true }
  );
  useWrapQueryAPI({ ...res });
  const { data: { order } = {} } = res ?? {};

  return (
    <WrapApp {...{ canStay, ...res, isSuccess: isObjOk(order) }}>
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "search", path: "#" },
                { label: "orders", path: "/consumer/orders/list" },
                { label: order?.id ?? "ID", path: "#" },
              ],
            }}
          />

          <div className="w-full grid grid-1 gap-10 mt-6">
            <HeaderOrderPage {...{ o: order as OrderType }} />

            <SpanAddressOrder {...{ o: order as OrderType }} />

            <BodyOrderConsumer {...{ o: order as OrderType }} />
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default OrderPageConsumer;
