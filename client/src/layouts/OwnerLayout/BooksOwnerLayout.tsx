import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const BooksOwnerLayout: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery();

  return user?.isOwner ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default BooksOwnerLayout;
