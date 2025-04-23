import { FC } from "react";
import Register from "../../../features/AuthLayout/Register/Register";
import { useScroll } from "../../../hooks/all/UI/useScroll";
import { WrapperAuthPage } from "@/components/components";

const RegisterPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "REGISTER" }}>
      <Register />
    </WrapperAuthPage>
  );
};
export default RegisterPage;
