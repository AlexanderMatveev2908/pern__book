import EmailForm from "@/common/forms/EmailForm/EmailForm";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import { useEmailVerifyAccount } from "@/core/hooks/all/forms/useEmailVerifyAccount";
import { useScroll } from "@/core/hooks/hooks";
import { SendMailEnd } from "@/types/types";
import { FC } from "react";

const VerifyAccount: FC = () => {
  useScroll();

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
