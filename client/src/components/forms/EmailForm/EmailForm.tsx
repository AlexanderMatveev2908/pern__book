/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Button from "../../common/buttons/Button/Button";
import FormField from "../components/inputs/FormField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { emailField } from "../../../config/fields/fields";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  handleSave: () => void;
};

const EmailForm: FC<PropsType> = ({ register, errors, handleSave }) => {
  return (
    <div className="parent__form">
      <form onSubmit={handleSave} className="form__content">
        <div className="w-full grid gap-5 p-6">
          <FormField {...{ register, errors, el: emailField }} />

          <div className="max-w-[250px] w-full justify-self-center mt-10">
            <Button
              {...{ label: "Login", isDisabled: false, isPending: false }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default EmailForm;
