import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import { ordersConsumerSliceAPI } from "../../ordersConsumerSliceAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import BreadCrumb from "@/components/elements/BreadCrumb";

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
    { skip: !isValidID }
  );
  useWrapQueryAPI({ ...res });
  const { data: { order } = {} } = res ?? {};

  return (
    <WrapPageAPI {...{ canStay, ...res, isSuccess: isObjOk(order) }}>
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "orders", path: "/consumer/orders" },
            { label: order?.id ?? "ID", path: "#" },
          ],
        }}
      />
    </WrapPageAPI>
  );
};

export default OrderPageConsumer;
