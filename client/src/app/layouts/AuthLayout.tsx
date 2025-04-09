import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  const isLogged = useSelector((state: RootStateType) => state.auth.isLogged);

  return isLogged ? <Navigate to="/" replace /> : <Outlet />;
};
export default AuthLayout;
