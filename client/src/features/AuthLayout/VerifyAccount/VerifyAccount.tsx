import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";

const VerifyAccount: FC = () => {
  const { register, errors, handleSubmit, isFormOk } = useMakeFormEmail();

  const handleSave = handleSubmit(() => {});

  return <EmailForm {...{ register, errors, handleSave, isFormOk }} />;
};
export default VerifyAccount;
