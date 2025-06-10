/* eslint-disable @typescript-eslint/no-unused-vars */
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { ownerOrdersSliceAPI } from "@/features/OwnerLayout/orders/ownerOrdersSliceAPI";
import type { FC } from "react";

const OrdersList: FC = () => {
  const { user } = useGetU();

  const hook = ownerOrdersSliceAPI.useLazyGetOwnerOrdersListQuery();
  const [_, res] = hook;

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBusinessOrders,
        ...res,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            { label: "Orders", path: "#" },
          ],
        }}
      />
    </WrapPageAPI>
  );
};

export default OrdersList;
