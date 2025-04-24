/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormField } from "@/components/components";
import { newEmailField } from "@/config/fields/UserLayout/fieldsManageAccount";
import { getStorage, schemaEmail } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useGetUserProfileQuery,
  useUpdateEmailMutation,
} from "../../userSliceAPI";
import { StorageKeys, UserType } from "@/types/types";
import { useFocus, useNotice, useWrapMutationAPI } from "@/hooks/hooks";
import { useHandleDangerAccount } from "@/hooks/all/useHandleDangerAccount";

const ChangeEmail: FC = () => {
  const { data } = useGetUserProfileQuery();
  const { user } = (data ?? {}) as { user: UserType };

  const schema = useMemo(
    () =>
      z
        .object({
          ...schemaEmail(),
        })
        .refine((data) => data.email !== user.email, {
          message: "new email must be different from old one",
          path: ["email"],
        }),
    [user?.email]
  );
  type FormNewEmailType = z.infer<typeof schema>;

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setFocus,
  } = useForm<FormNewEmailType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useFocus({ setFocus, key: "email" });

  const email = watch("email");
  const isFormOk = useMemo(
    () => !errors?.email?.message && email?.trim()?.length,
    [errors?.email?.message, email]
  );

  const [updateEmail, { isLoading }] = useUpdateEmailMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();
  const { handleDanger } = useHandleDangerAccount();

  const handleSave = handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        updateEmail({
          ...formData,
          token: getStorage(StorageKeys.SECURITY) ?? "",
        }),
      customErrCB: handleDanger,
    });
    if (!res) return;

    makeNoticeCombo({
      status: res.status,
      msg: "We've sent you an email to the new address u give us. If you don't see it, check your spam folder, it might be partying there 🎉",
    });
  });

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 justify-items-center gap-8"
    >
      <div className="w-full grid justify-items-center gap-5">
        <FormField
          {...{
            el: newEmailField,
            errors,
            register,
          }}
        />
      </div>

      <div className="w-[250px]">
        <Button
          {...{
            label: "Update Email",
            type: "submit",
            isAging: isLoading,
            isDisabled: !isFormOk,
          }}
        />
      </div>
    </form>
  );
};
export default ChangeEmail;
