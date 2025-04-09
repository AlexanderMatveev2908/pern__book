import { FC } from "react";
import Title from "../../../components/common/Title";
import Register from "../../../features/AuthLayout/Register/Register";

const RegisterPage: FC = () => {
  return (
    <div className="w-full grid text-white justify-items-center gap-10">
      <Title {...{ title: "Register" }} />

      <Register />
    </div>
  );
};
export default RegisterPage;
