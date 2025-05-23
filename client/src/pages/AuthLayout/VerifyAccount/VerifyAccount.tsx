import EmailForm from "@/common/forms/EmailForm/EmailForm";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import { useEmailVerifyAccount } from "@/core/hooks/all/forms/useEmailVerifyAccount";
import { SendMailEnd } from "@/types/types";
import { FC } from "react";

const VerifyAccount: FC = () => {
  const { isLoading, handleSave, form } = useEmailVerifyAccount(
    SendMailEnd.VERIFY_ACCOUNT
  );

  return (
    <WrapperAuthPage {...{ title: "VERIFY ACCOUNT" }}>
      <EmailForm {...{ ...form, handleSave, isLoading }} />
    </WrapperAuthPage>
  );
};

export default VerifyAccount;
