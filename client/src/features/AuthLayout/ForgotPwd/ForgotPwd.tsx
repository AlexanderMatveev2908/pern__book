import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";

const ForgotPwd: FC = () => {
  const { register, errors, handleSubmit } = useMakeFormEmail();

  const handleSave = handleSubmit(() => {});

  return <EmailForm {...{ errors, register, handleSave }} />;
};
export default ForgotPwd;
