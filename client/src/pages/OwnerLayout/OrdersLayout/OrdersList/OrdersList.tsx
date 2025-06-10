import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import type { FC } from "react";

const OrdersList: FC = () => {
  const { user } = useGetU();

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBusinessOrders,
      }}
    ></WrapPageAPI>
  );
};

export default OrdersList;
