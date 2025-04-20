import { FC } from "react";
import ForgotPwd from "../../../features/AuthLayout/ForgotPwd/ForgotPwd";
import { useScroll } from "@/hooks/hooks";
import { WrapperAuthPage } from "@/components/components";

const ForgotPwdPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "RECOVER ACCOUNT" }}>
      <ForgotPwd />
    </WrapperAuthPage>
  );
};
export default ForgotPwdPage;
