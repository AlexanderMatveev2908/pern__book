import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import type { FC } from "react";

const OrdersListWorker: FC = () => {
  const { user } = useGetU();

  return <WrapPageAPI {...{ canStay: user?.isWorker }}></WrapPageAPI>;
};

export default OrdersListWorker;
