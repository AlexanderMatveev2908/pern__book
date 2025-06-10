import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { ownerOrdersSliceAPI } from "@/features/OwnerLayout/orders/ownerOrdersSliceAPI";
import type { FC } from "react";

const OrdersList: FC = () => {
  const { user } = useGetU();

  const res = ownerOrdersSliceAPI.useGetOwnerOrdersListQuery({});

  useWrapQueryAPI({ ...res });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBusinessOrders,
        ...res,
      }}
    ></WrapPageAPI>
  );
};

export default OrdersList;
