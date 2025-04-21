/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, isObjOk, schemaEmail, schemaNames } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserProfileQuery } from "../userSliceAPI";
import { WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";
import HeaderUserProfile from "./HeaderUserProfile/HeaderUserProfile";

const schema = z.object({
  ...schemaNames(),
  ...schemaEmail(),
});

type UserFormType = z.infer<typeof schema>;

const UserProfile: FC = () => {
  const formCtx = useForm<UserFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { getValues, setValue } = formCtx;

  const { data, isLoading, error, isError } = useGetUserProfileQuery() ?? {};
  const user: UserType = getData(data, "user");

  useEffect(() => {
    const updateForm = () => {
      const fields = getValues();
      if (isObjOk(user)) {
        for (const key in fields) {
          if (user[key as keyof UserType] !== undefined) {
            setValue(key as keyof UserFormType, (user as any)[key] ?? "");
          }
        }
      }
    };
    updateForm();
  }, [user, getValues, setValue]);

  const handleSave = formCtx.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <WrapPageAPI {...{ isLoading, isError, error }}>
      <FormProvider {...formCtx}>
        <form onSubmit={handleSave} className="w-full grid">
          <HeaderUserProfile {...{ user }} />
        </form>
      </FormProvider>
    </WrapPageAPI>
  );
};
export default UserProfile;
