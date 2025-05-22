import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/useGetU";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const BookStoresLayoutWorker: FC = () => {
  const { isLoading, user } = useGetU();

  return (
    <WrapPageAPI {...{ canStay: user?.isWorker, isLoading }}>
      <Outlet />
    </WrapPageAPI>
  );
};

export default BookStoresLayoutWorker;
