/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/elements/buttons/Button/Button";
import PairPwd from "@/components/forms/layouts/PairPwd/PairPwd";
import { fieldsNewPwd } from "@/core/config/fieldsData/AuthLayout/auth";
import { useShowPwd } from "@/core/hooks/hooks";
import { preventBrowser } from "@/core/lib/all/forms/preSubmit/submit";
import { isFormValid } from "@/core/lib/lib";
import { FormBaseProps } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { FormState, UseFormWatch } from "react-hook-form";

type PropsType = {
  handleSave: () => void;
  formState: FormState<any>;
  isLoading: boolean;
  watch: UseFormWatch<any>;
} & Omit<FormBaseProps, "errors">;

const NewPwdForm: FC<PropsType> = ({
  register,
  formState,
  handleSave,
  watch,
  isLoading,
}) => {
  const [isFormOk, setIsFormOk] = useState(false);

  const { errors } = formState;

  const { mainPwd, confirmPwd, closeAllPwd } = useShowPwd();

  useEffect(() => {
    const sub = watch((vals) => {
      setIsFormOk(isFormValid(errors, vals));
    });

    return () => sub.unsubscribe();
  }, [watch, errors]);

  const pwd = watch("password");

  return (
    <div className="parent__form">
      <form
        onSubmit={(e) =>
          preventBrowser(e, async () => {
            closeAllPwd();
            await handleSave();
          })
        }
        className="form__content"
      >
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
