import { FC } from "react";
import EmailForm from "../../../components/forms/EmailForm/EmailForm";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";

const VerifyAccount: FC = () => {
  const { register, errors, handleSubmit } = useMakeFormEmail();

  const handleSave = handleSubmit(() => {});

  return <EmailForm {...{ register, errors, handleSave }} />;
};
export default VerifyAccount;
