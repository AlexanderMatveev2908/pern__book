import { FC } from "react";
import Title from "../../../components/common/Title";
import Register from "../../../features/AuthLayout/Register/Register";
import { useScroll } from "../../../hooks/useScroll";

const RegisterPage: FC = () => {
  useScroll();

  return (
    <div className="parent__page">
      <Title {...{ title: "Register" }} />

      <Register />
    </div>
  );
};
export default RegisterPage;
