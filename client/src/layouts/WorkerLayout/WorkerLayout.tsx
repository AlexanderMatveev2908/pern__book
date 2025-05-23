import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperLogged from "@/components/HOC/WrapperLogged";
import { useGetU } from "@/core/hooks/all/useGetU";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const WorkerLayout: FC = () => {
  const { user, isLoading } = useGetU();

  return (
    <WrapPageAPI {...{ isLoading, canStay: user?.isWorker }}>
      <WrapperLogged>
        <Outlet />
      </WrapperLogged>
    </WrapPageAPI>
  );
};

export default WorkerLayout;
