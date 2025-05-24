import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useGetU } from "@/core/hooks/all/useGetU";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

const BooksOwnerLayout: FC = () => {
  const { user, isLoading } = useGetU();

  return (
    <WrapPageAPI {...{ canStay: user?.isOwner, isLoading, user }}>
      <Outlet />
    </WrapPageAPI>
  );
};

export default BooksOwnerLayout;
