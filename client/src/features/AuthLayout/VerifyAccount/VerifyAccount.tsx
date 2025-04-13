import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/useMakeFormEmail";
import EmailForm from "../../../components/forms/EmailForm/EmailForm";

const VerifyAccount: FC = () => {
  const { register, errors, handleSubmit } = useMakeFormEmail();

  const handleSave = handleSubmit((formData) => {
    console.log(formData);
  });

  return <EmailForm {...{ register, errors, handleSave }} />;
};
export default VerifyAccount;
