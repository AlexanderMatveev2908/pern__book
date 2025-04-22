/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Button, FormField } from "@/components/components";
import { isFormValid } from "@/lib/lib";
import { FormBaseProps } from "@/types/types";
import { UseFormWatch } from "react-hook-form";
import { emailField } from "@/config/fields/AuthLayout/fieldsAuth";

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
    <div className="parent__form">
      <form onSubmit={handleSave} className="form__content">
        <div className="w-full grid gap-5 p-6">
          <FormField {...{ register, errors, el: emailField }} />

          <div className="max-w-[250px] w-full justify-self-center mt-10">
            <Button
              {...{ label: "Login", isDisabled: !isFormOk, isAging: isLoading }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default EmailForm;
