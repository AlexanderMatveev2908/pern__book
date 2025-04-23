import { Button, FormField } from "@/components/components";
import { newEmailField } from "@/config/fields/UserLayout/fieldsManageAccount";
import { schemaEmail } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserProfileQuery } from "../../userSliceAPI";
import { UserType } from "@/types/types";
import { useFocus } from "@/hooks/hooks";

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

  const handleSave = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 justify-items-center gap-10"
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
            isAging: false,
            isDisabled: !isFormOk,
          }}
        />
      </div>
    </form>
  );
};
export default ChangeEmail;
