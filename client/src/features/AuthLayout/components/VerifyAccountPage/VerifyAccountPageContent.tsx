import EmailForm from "@/common/forms/EmailForm/EmailForm";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import { useEmailVerifyAccount } from "@/core/hooks/all/forms/email/useEmailVerifyAccount";
import { SendMailEnd } from "@/types/types";
import type { FC } from "react";

const VerifyAccountPageContent: FC = () => {
  const { isLoading, handleSave, form } = useEmailVerifyAccount(
    SendMailEnd.VERIFY_ACCOUNT
  );

  return (
    <WrapperAuthPage {...{ title: "VERIFY ACCOUNT" }}>
      <EmailForm {...{ ...form, handleSave, isLoading }} />
    </WrapperAuthPage>
  );
};

export default VerifyAccountPageContent;
