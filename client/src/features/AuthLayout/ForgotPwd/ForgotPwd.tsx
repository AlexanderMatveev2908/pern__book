import { FC } from "react";
import EmailForm from "../../../components/forms/EmailForm/EmailForm";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";

const ForgotPwd: FC = () => {
  const { register, errors, handleSubmit } = useMakeFormEmail();

  const handleSave = handleSubmit((formData) => {
    console.log(formData);
  });

  return <EmailForm {...{ errors, register, handleSave }} />;
};
export default ForgotPwd;
