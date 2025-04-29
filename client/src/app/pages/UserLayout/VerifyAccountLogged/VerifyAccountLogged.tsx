import { EmailForm, Title } from "@/components/components";
import { useEmailVerifyAccount } from "@/hooks/all/forms/useEmailVerifyAccount";
import { useScroll } from "@/hooks/hooks";
import { SendMailEnd } from "@/types/types";
import { FC } from "react";

const VerifyAccountLogged: FC = () => {
  useScroll();

  const { isLoading, handleSave, form } = useEmailVerifyAccount(
    SendMailEnd.VERIFY_ACCOUNT_LOGGED
  );

  return (
    <div className="parent__page">
      <Title {...{ title: "Verify account" }} />
      <EmailForm {...{ ...form, handleSave, isLoading }} />
    </div>
  );
};

export default VerifyAccountLogged;
