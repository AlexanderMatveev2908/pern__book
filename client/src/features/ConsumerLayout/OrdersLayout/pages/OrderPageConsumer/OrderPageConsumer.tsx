import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import { ordersConsumerSliceAPI } from "../../ordersConsumerSliceAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { formatD, isObjOk, priceFormatter } from "@/core/lib/lib";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { TbPigMoney } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import SpanPageInfo from "@/components/elements/cards/shared/SpanPageInfo";
import HeaderOrderPage from "./components/HeaderOrderPage/HeaderOrderPage";
import { OrderType } from "@/types/all/orders";

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
    <WrapPageAPI {...{ canStay, ...res }}>
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "orders", path: "/consumer/orders/list" },
            { label: order?.id ?? "ID", path: "#" },
          ],
        }}
      />

      {isObjOk(order) && (
        <div className="w-full grid grid-1 gap-6 mt-6">
          <HeaderOrderPage {...{ o: order as OrderType }} />
        </div>
      )}
    </WrapPageAPI>
  );
};

export default OrderPageConsumer;
