import { getStorage, schemaPwd } from "@/core/lib/lib";
import { FC, useEffect, useMemo } from "react";
import { z } from "zod";
import { StorageKeys } from "@/types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReturnShowPwd, useWrapMutationAPI } from "@/core/hooks/hooks";
import { preventBrowser } from "@/core/lib/all/forms/errPreSubmit/general";
import { useUpdatePwdMutation } from "@/features/UserLayout/userSliceAPI";
import Button from "@/components/elements/buttons/Button/Button";
import { SwapModeType } from "@/core/contexts/SwapCtx/ctx/initState";
import PairPwd from "@/components/forms/layouts/PairPwd/PairPwd";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useHandleDangerAccount } from "@/features/UserLayout/hooks/useHandleDangerAccount";
import { fieldsNewPwdReset } from "@/features/UserLayout/fields/manageAccount";

type PropsType = {
  propsPwd: ReturnShowPwd;
  cond: boolean;
  setSwapState: (val: SwapModeType | null) => void;
};

const ResetPwd: FC<PropsType> = ({ propsPwd, cond, setSwapState }) => {
  const { user } = useGetU();
  const schema = useMemo(
    () =>
      z
        .object({
          ...schemaPwd(),
          confirmPassword: z
            .string()
            .min(1, "You should confirm your new password"),
        })
        .refine((data) => data.password !== user?.email, {
          message: "A password must be different from email",
          path: ["password"],
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Password do not match",
          path: ["confirmPassword"],
        }),
    [user?.email]
  );
  type FormNewEmailType = z.infer<typeof schema>;

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
    clearErrors,
    setFocus,
    trigger: triggerRHF,
  } = useForm<FormNewEmailType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: null,
      confirmPassword: "",
    },
  });
  const pwd = watch("password");
  const confirmPwd = watch("confirmPassword");

  const [updatePwd, { isLoading }] = useUpdatePwdMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { handleDanger } = useHandleDangerAccount();

  const { closeAllPwd, ...restProps } = propsPwd;

  const handleSave = handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        updatePwd({
          token: getStorage(StorageKeys.SECURITY) as string,
          password: formData.password as string,
        }),
      customErrCB: handleDanger,
    });

    if (!res) return;

    reset();
    clearErrors();
  });

  const isFormOk = useMemo(
    () =>
      isValid &&
      Object.values([pwd, confirmPwd]).every((val) => !!val?.trim()?.length),
    [isValid, pwd, confirmPwd]
  );

  useEffect(() => {
    if (cond) setFocus("password");
  }, [cond, setFocus]);

  return (
    <form
      onSubmit={(e) =>
        preventBrowser(e, async () => {
          closeAllPwd();
          setSwapState(null);
          await handleSave();
        })
      }
      className="w-full grid grid-cols-1 justify-items-center gap-8"
    >
      <div className="w-full grid justify-items-center gap-5">
        <PairPwd
          {...{
            control,
            errors,
            fields: fieldsNewPwdReset,
            ...restProps,
            pwd,
            customCbs: [
              () => triggerRHF("confirmPassword"),
              () => triggerRHF("password"),
            ],
          }}
        />
      </div>

      <div className="w-full max-w-[300px]">
        <Button
          {...{
            label: "Update password",
            type: "submit",
            isAging: isLoading,
            isDisabled: !isFormOk,
          }}
        />
      </div>
    </form>
  );
};
export default ResetPwd;
