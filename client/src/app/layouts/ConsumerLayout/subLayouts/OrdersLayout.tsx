import WrapperLogged from "@/components/HOC/WrapperLogged";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const OrdersLayout: FC = () => {
  return (
    <WrapperLogged>
      <Outlet />
    </WrapperLogged>
  );
};

export default OrdersLayout;
