import { FC } from "react";
import { EmailForm } from "@/components/components";
import { SendMailEnd } from "@/types/types";
import { useEmailVerifyAccount } from "@/hooks/all/forms/useEmailVerifyAccount";

const VerifyAccount: FC = () => {
  const { isLoading, handleSave, form } = useEmailVerifyAccount(
    SendMailEnd.VERIFY_ACCOUNT
  );

  return <EmailForm {...{ ...form, handleSave, isLoading }} />;
};
export default VerifyAccount;
