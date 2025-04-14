import { FC } from "react";
import WrapperAuthPage from "../../../components/common/WrapperAuthPage";
import ForgotPwd from "../../../features/AuthLayout/ForgotPwd/ForgotPwd";
import { useScroll } from "@/hooks/hooks";

const ForgotPwdPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "RECOVER PASSWORD" }}>
      <ForgotPwd />
    </WrapperAuthPage>
  );
};
export default ForgotPwdPage;
