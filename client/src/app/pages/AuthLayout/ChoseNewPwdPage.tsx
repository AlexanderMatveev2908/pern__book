import { WrapperAuthPage } from "@/components/components";
import ChoseNewPwd from "@/features/AuthLayout/ChoseNewPwd/ChoseNewPwd";

const ChoseNewPwdPage = () => {
  return (
    <WrapperAuthPage {...{ title: "RECOVER ACCOUNT", switchForm: false }}>
      <ChoseNewPwd />
    </WrapperAuthPage>
  );
};
export default ChoseNewPwdPage;
