import { FC } from "react";
import { useScroll } from "../../../hooks/all/UI/useScroll";
import Login from "../../../features/AuthLayout/Login/Login";
import { WrapperAuthPage } from "@/components/components";

const LoginPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "LOGIN" }}>
      <Login />
    </WrapperAuthPage>
  );
};
export default LoginPage;
