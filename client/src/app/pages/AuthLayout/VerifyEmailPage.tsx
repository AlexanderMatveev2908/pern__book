import { FC } from "react";
import WrapperAuthPage from "../../../components/common/WrapperAuthPage";
import VerifyAccount from "../../../features/AuthLayout/VerifyAccount/VerifyAccount";
import { useScroll } from "@/hooks/hooks";

const VerifyEmailPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "VERIFY ACCOUNT" }}>
      <VerifyAccount />
    </WrapperAuthPage>
  );
};
export default VerifyEmailPage;
