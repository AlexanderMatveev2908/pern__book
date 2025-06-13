/* eslint-disable @typescript-eslint/no-explicit-any */
import EmailForm from "@/common/forms/EmailForm/EmailForm";
import Title from "@/components/elements/Title";
import { useEmailVerifyAccount } from "@/core/hooks/all/forms/email/useEmailVerifyAccount";
import { SendMailEnd } from "@/types/types";
import type { FC } from "react";

const VerifyAccountLogged: FC = () => {
  const { isLoading, handleSave, form } = useEmailVerifyAccount(
    SendMailEnd.VERIFY_ACCOUNT_LOGGED
  );

  return (
    <div className="p_page">
      <Title {...{ title: "Verify account" }} />
      <EmailForm {...({ ...form, handleSave, isLoading } as any)} />
    </div>
  );
};

export default VerifyAccountLogged;
