import WrapperLogged from "@/components/HOC/WrapperLogged";
import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <WrapperLogged>
      <Outlet />
    </WrapperLogged>
  );
};
export default OwnerLayout;
