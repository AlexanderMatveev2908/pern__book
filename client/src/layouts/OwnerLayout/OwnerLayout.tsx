import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperLogged from "@/components/HOC/WrapperLogged";
import { useGetU } from "@/core/hooks/all/useGetU";
import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  const { user, isLoading } = useGetU();

  return (
    <WrapPageAPI {...{ isLoading, canStay: user?.isOwner }}>
      <WrapperLogged>
        <Outlet />
      </WrapperLogged>
    </WrapPageAPI>
  );
};
export default OwnerLayout;
