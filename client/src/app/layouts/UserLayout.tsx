import WrapperLogged from "@/components/HOC/WrapperLogged";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const UserLayout: FC = () => {
  return (
    <WrapperLogged>
      <Outlet />
    </WrapperLogged>
  );
};
export default UserLayout;
