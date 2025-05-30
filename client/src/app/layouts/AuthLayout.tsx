import { getAuthState } from "@/features/AuthLayout/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  const authState = useSelector(getAuthState);

  return authState.isLogged ? <Navigate to="/" replace={true} /> : <Outlet />;
};
export default AuthLayout;
