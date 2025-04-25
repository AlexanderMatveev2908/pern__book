import { EmailForm } from "@/components/components";
import { FC } from "react";
import { SendMailEnd } from "@/types/types";
import { useEmailVerifyAccount } from "@/hooks/all/forms/useEmailVerifyAccount";

const VerifyEmailUser: FC = () => {
  const { isLoading, handleSave, form } = useEmailVerifyAccount(
    SendMailEnd.VERIFY_ACCOUNT_LOGGED
  );

  return <EmailForm {...{ ...form, handleSave, isLoading }} />;
};
export default VerifyEmailUser;
