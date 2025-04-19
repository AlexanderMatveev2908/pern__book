import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";

const ForgotPwd: FC = () => {
  const { register, errors, handleSubmit, isFormOk } = useMakeFormEmail();

  const handleSave = handleSubmit(() => {});

  return <EmailForm {...{ errors, register, handleSave, isFormOk }} />;
};
export default ForgotPwd;
