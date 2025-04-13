import { FC } from "react";
import Title from "../../../components/common/Title";
import { useScroll } from "../../../hooks/useScroll";
import Login from "../../../features/AuthLayout/Login/Login";

const LoginPage: FC = () => {
  useScroll();

  return (
    <div className="parent__page">
      <Title {...{ title: "Login" }} />

      <Login />
    </div>
  );
};
export default LoginPage;
