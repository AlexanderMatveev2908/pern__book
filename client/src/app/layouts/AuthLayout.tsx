import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthState } from "../../features/AuthLayout/authSlice";

const AuthLayout: FC = () => {
  const isLogged = useSelector(getAuthState).isLogged;

  return isLogged ? <Navigate to="/" replace={true} /> : <Outlet />;
};
export default AuthLayout;
