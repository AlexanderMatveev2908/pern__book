import { WrapperAuthPage } from "@/components/components";
import ChoseNewPwd from "@/features/AuthLayout/ChoseNewPwd/ChoseNewPwd";
import { useScroll } from "@/hooks/hooks";

const ChoseNewPwdPage = () => {
  useScroll();

  return (
    <WrapperAuthPage {...{ title: "RECOVER ACCOUNT", switchForm: false }}>
      <ChoseNewPwd />
    </WrapperAuthPage>
  );
};
export default ChoseNewPwdPage;
