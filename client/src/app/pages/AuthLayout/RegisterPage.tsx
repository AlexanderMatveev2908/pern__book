import { FC } from "react";
import Register from "../../../features/AuthLayout/Register/Register";
import { useScroll } from "../../../hooks/useScroll";
import WrapperAuthPage from "../../../components/common/WrapperAuthPage";

const RegisterPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "REGISTER" }}>
      <Register />
    </WrapperAuthPage>
  );
};
export default RegisterPage;
