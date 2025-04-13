import { FC } from "react";
import WrapperAuthPage from "../../../components/common/WrapperAuthPage";
import VerifyAccount from "../../../features/AuthLayout/VerifyAccount/VerifyAccount";

const VerifyEmailPage: FC = () => {
  return (
    <WrapperAuthPage {...{ title: "VERIFY ACCOUNT" }}>
      <VerifyAccount />
    </WrapperAuthPage>
  );
};
export default VerifyEmailPage;
