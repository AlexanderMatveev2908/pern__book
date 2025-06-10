import { getAuthState } from "@/features/AuthLayout/authSlice";
import { canPushUser } from "@/core/lib/lib";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import Push from "@/app/routes/helpers/Push";

type PropsType = {
  children: ReactNode;
};

const WrapperLogged: FC<PropsType> = ({ children }) => {
  const authState = useSelector(getAuthState);

  return canPushUser(authState) ? (
    <Push {...{ path: "/auth/login" }} />
  ) : (
    children
  );
};
export default WrapperLogged;
