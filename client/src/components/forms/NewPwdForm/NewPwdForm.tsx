/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, PairPwd } from "@/components/components";
import { fieldsNewPwd } from "@/config/fields/fields";
import { useShowPwd } from "@/hooks/hooks";
import { isFormValid } from "@/lib/lib";
import { FC, useEffect, useState } from "react";
import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";

type PropsType = {
  handleSave: () => void;
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isLoading: boolean;
  watch: UseFormWatch<any>;
};

const NewPwdForm: FC<PropsType> = ({
  register,
  formState,
  handleSave,
  watch,
  isLoading,
}) => {
  const [isFormOk, setIsFormOk] = useState(false);

  const { errors } = formState;

  const { mainPwd, confirmPwd } = useShowPwd();

  useEffect(() => {
    const sub = watch((vals) => {
      setIsFormOk(isFormValid(errors, vals));
    });

    return () => sub.unsubscribe();
  }, [watch, errors]);

  const pwd = watch("password");

  return (
    <div className="parent__form">
      <form onSubmit={handleSave} className="form__content">
        <div className="w-full grid gap-5 p-6">
          <PairPwd
            {...{
              register,
              errors,
              mainPwd,
              confirmPwd,
              pwd,
              fields: fieldsNewPwd,
            }}
          />

          <div className="max-w-[300px] w-full justify-self-center mt-10">
            <Button
              {...{
                label: "Save Password",
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
export default NewPwdForm;
