import { WrapperLogged } from "@/components/components";
import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <WrapperLogged>
      <Outlet />
    </WrapperLogged>
  );
};
export default OwnerLayout;
