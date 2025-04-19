import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";

const ForgotPwd: FC = () => {
  const form = useMakeFormEmail();
  const { handleSubmit } = form;

  const handleSave = handleSubmit(() => {});

  return <EmailForm {...{ ...form, handleSave }} />;
};
export default ForgotPwd;
