/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, isObjOk, schemaNames } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserProfileQuery } from "../userSliceAPI";
import { WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";
import { useSwapAddress } from "@/contexts/SwapAddress/useSwapAddress";

const schema = z
  .object({
    ...schemaNames(),

    Thumb: z.union([z.string(), z.instanceof(FileList)]),
  })
  .refine(
    (data) =>
      !data?.Thumb?.[0] || (data?.Thumb?.[0] as File)?.type.startsWith("image"),
    {
      message: "Thumbnail must be an image",
      path: ["Thumb"],
    }
  );

export type UserProfileForm = z.infer<typeof schema>;

const UserProfile: FC = () => {
  const formCtx = useForm<UserProfileForm>({
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
          if (key === "Thumb" && user.Thumb?.url !== null)
            setValue(key as keyof UserProfileForm, user.Thumb!.url);
          else if (user[key as keyof UserType] !== undefined) {
            setValue(key as keyof UserProfileForm, (user as any)[key] ?? "");
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
          <BodyUserProfile />
        </form>
      </FormProvider>
    </WrapPageAPI>
  );
};
export default UserProfile;
