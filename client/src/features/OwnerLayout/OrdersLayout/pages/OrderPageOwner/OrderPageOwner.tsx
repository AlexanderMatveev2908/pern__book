import type { FC } from "react";
import { ownerOrdersSliceAPI } from "../../ownerOrdersSliceAPI";
import { useParams } from "react-router-dom";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { isObjOk } from "@/core/lib/lib";
import OrderStorePage from "@/components/elements/cards/orders/OrderStorePage/OrderStorePage";
import { OrderStoreType } from "@/types/all/orders";

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

  return (
    <WrapPageAPI {...{ ...res, canStay: isValidID }}>
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            { label: "Orders", path: "/owner/orders/list" },
            { label: order?.id ?? "order", path: "#" },
          ],
        }}
      />

      {isObjOk(order) && (
        <div className="w-full grid grid-cols-1 gap-y-6 mt-10">
          <OrderStorePage {...{ os: order as OrderStoreType }} />
        </div>
      )}
    </WrapPageAPI>
  );
};

export default OrderPageOwner;
