import { FC } from "react";
import VerifyAccount from "../../../features/AuthLayout/VerifyAccount/VerifyAccount";
import { useScroll } from "@/hooks/hooks";
import { WrapperAuthPage } from "@/components/components";

const VerifyEmailPage: FC = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "VERIFY ACCOUNT", canStay: true }}>
      <VerifyAccount />
    </WrapperAuthPage>
  );
};
export default VerifyEmailPage;
