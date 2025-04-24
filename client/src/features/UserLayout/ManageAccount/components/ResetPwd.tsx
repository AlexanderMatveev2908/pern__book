import { getStorage, schemaPwd } from "@/lib/lib";
import { FC, useMemo } from "react";
import { z } from "zod";
import {
  useGetUserProfileQuery,
  useUpdatePwdMutation,
} from "../../userSliceAPI";
import { StorageKeys, UserType } from "@/types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PairPwd } from "@/components/components";
import { fieldsNewPwdReset } from "@/config/fields/UserLayout/fieldsManageAccount";
import { ReturnShowPwd, useWrapMutationAPI } from "@/hooks/hooks";
import { preventBrowser } from "@/lib/all/forms/preSubmit/submit";
import { useHandleDangerAccount } from "@/hooks/all/useHandleDangerAccount";

type PropsType = {
  propsPwd: ReturnShowPwd;
};

const ResetPwd: FC<PropsType> = ({ propsPwd }) => {
  const { data } = useGetUserProfileQuery();
  const { user } = (data ?? {}) as { user: UserType };

  const schema = useMemo(
    () =>
      z
        .object({
          ...schemaPwd(),
          confirmPassword: z
            .string()
            .min(1, "You should confirm your new password"),
        })
        .refine((data) => data.password !== user.email, {
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
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    clearErrors,
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
      !Object.keys(errors).length &&
      Object.values([pwd, confirmPwd]).every((val) => val?.trim()?.length),
    [errors, pwd, confirmPwd]
  );
  return (
    <form
      onSubmit={(e) =>
        preventBrowser(e, async () => {
          closeAllPwd();
          await handleSave();
        })
      }
      className="w-full grid grid-cols-1 justify-items-center gap-8"
    >
      <div className="w-full grid justify-items-center gap-5">
        <PairPwd
          {...{
            register,
            errors,
            fields: fieldsNewPwdReset,
            ...restProps,
            pwd,
          }}
        />
      </div>

      <div className="w-[275px]">
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
