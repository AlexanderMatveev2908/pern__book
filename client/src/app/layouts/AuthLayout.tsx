import { getAuthState } from "@/features/AuthLayout/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Push from "../routes/helpers/Push";

const AuthLayout: FC = () => {
  const authState = useSelector(getAuthState);

  return authState.isLogged ? <Push /> : <Outlet />;
};
export default AuthLayout;
