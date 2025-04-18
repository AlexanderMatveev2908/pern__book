import { getAuthState } from "@/features/AuthLayout/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout: FC = () => {
  const authState = useSelector(getAuthState);

  return authState.isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};
export default UserLayout;
