/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/elements/buttons/Button/Button";
import PairPwd from "@/components/forms/layouts/PairPwd/PairPwd";
import { fieldsNewPwd } from "@/features/AuthLayout/fields/auth";
import { useShowPwd } from "@/core/hooks/hooks";
import { preventBrowser } from "@/core/lib/all/forms/errPreSubmit/general";
import { isFormValid } from "@/core/lib/lib";
import { FC, useEffect, useState } from "react";
import {
  Control,
  FormState,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

type PropsType = {
  handleSave: () => void;
  formState: FormState<any>;
  isLoading: boolean;
  watch: UseFormWatch<any>;
  control: Control<any>;
  trigger: UseFormTrigger<any>;
};

const NewPwdForm: FC<PropsType> = ({
  control,
  formState,
  handleSave,
  watch,
  isLoading,
  trigger: triggerRHF,
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
    <div className="p_form__1">
      <form
        onSubmit={(e) =>
          preventBrowser(e, async () => {
            closeAllPwd();
            await handleSave();
          })
        }
        className="p_form__2"
      >
        <div className="w-full grid gap-5 p-6">
          <PairPwd
            {...{
              control,
              errors,
              mainPwd,
              confirmPwd,
              pwd,
              fields: fieldsNewPwd,
              customCbs: [
                () => triggerRHF("confirmPassword"),
                () => triggerRHF("password"),
              ],
            }}
          />

          <div className="w-full max-w-[300px] justify-self-center mt-10">
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
