import { getAuthState } from "@/features/AuthLayout/authSlice";
import { canPushUser } from "@/core/lib/lib";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type PropsType = {
  children: ReactNode;
};

const WrapperLogged: FC<PropsType> = ({ children }) => {
  const authState = useSelector(getAuthState);

  return canPushUser(authState) ? (
    <Navigate to="/auth/login" replace={true} />
  ) : (
    children
  );
};
export default WrapperLogged;
