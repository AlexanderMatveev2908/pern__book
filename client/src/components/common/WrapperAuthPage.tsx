import { FC, ReactNode } from "react";
import Title from "./Title";
import SwitcherFormAuth from "../forms/components/SwitcherFormAuth";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { Navigate } from "react-router-dom";

type PropsType = {
  title: string;
  children: ReactNode;
  canStay?: boolean;
};

const WrapperAuthPage: FC<PropsType> = ({ children, title, canStay }) => {
  const authState = useSelector(getAuthState);

  return authState.isLogged && !canStay ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className="parent__page">
      <Title {...{ title }} />
      {children}
      <SwitcherFormAuth />
    </div>
  );
};
export default WrapperAuthPage;
