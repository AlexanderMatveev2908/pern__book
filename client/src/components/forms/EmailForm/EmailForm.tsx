/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { emailField } from "../../../config/fields/fields";
import { Button, FormField } from "@/components/components";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  handleSave: () => void;
  isFormOk: boolean;
};

const EmailForm: FC<PropsType> = ({
  register,
  errors,
  handleSave,
  isFormOk,
}) => {
  return (
    <div className="parent__form">
      <form onSubmit={handleSave} className="form__content">
        <div className="w-full grid gap-5 p-6">
          <FormField {...{ register, errors, el: emailField }} />

          <div className="max-w-[250px] w-full justify-self-center mt-10">
            <Button
              {...{ label: "Login", isDisabled: !isFormOk, isPending: false }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default EmailForm;
