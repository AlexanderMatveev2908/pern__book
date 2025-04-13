import { FC } from "react";
import WrapperAuthPage from "../../../components/common/WrapperAuthPage";
import ForgotPwd from "../../../features/AuthLayout/ForgotPwd/ForgotPwd";

const ForgotPwdPage: FC = () => {
  return (
    <WrapperAuthPage {...{ title: "RECOVER PASSWORD" }}>
      <ForgotPwd />
    </WrapperAuthPage>
  );
};
export default ForgotPwdPage;
