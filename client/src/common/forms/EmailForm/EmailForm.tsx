/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { isFormValid } from "@/core/lib/lib";
import { FormBaseProps } from "@/types/types";
import { UseFormWatch } from "react-hook-form";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import Button from "@/components/elements/buttons/Button/Button";
import { emailField } from "@/core/config/fieldsData/AuthLayout/auth";

type PropsType = {
  handleSave: () => void;
  watch: UseFormWatch<any>;
  isLoading: boolean;
} & FormBaseProps;

const EmailForm: FC<PropsType> = ({
  register,
  errors,
  handleSave,
  watch,
  isLoading,
}) => {
  const [isFormOk, setIsFormOk] = useState(false);

  const vals = watch();

  useEffect(() => {
    setIsFormOk(isFormValid(errors, vals));
  }, [errors, vals, setIsFormOk]);

  return (
    <div className="p_form__1">
      <form onSubmit={handleSave} className="p_form__2">
        <div className="w-full grid gap-5 p-6">
          <FormField {...{ register, errors, el: emailField }} />

          <div className="w-full max-w-[250px] justify-self-center mt-10">
            <Button
              {...{
                label: "Send Email",
                isDisabled: !isFormOk,
                isAging: isLoading,
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default EmailForm;
